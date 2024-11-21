import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../translator.css';

import Dropdown from "../Dropdown.jsx";
import {OrbitProgress} from "react-loading-indicators";


function Translator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const options = ['ru-RU', 'en-US', 'fr-FR', 'es-ES'];

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    
    const [error, setError] = useState('');

    const [original, setOriginal] = useState('');
    const [translate, setTranslate] = useState('');
    const [loading, setLoading] = useState(false);

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    useEffect(() => {
        const cookie = getCookie('isLogin');
        if (cookie === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            navigate('/login');
        }
    }, [navigate]);

    if (!isAuthenticated) {
        return <div>Redirecting...</div>;
    }

    const startRecording = async (e) => {
        e.preventDefault();
        setError("");
        setAudioUrl(null);
        console.log(`Recording in ${from}, translating to ${to}`);
        audioChunksRef.current = [];

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            uploadAudio(audioBlob, from, to);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const uploadAudio = async (audioBlob, from, to) => {

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append('audio', audioBlob, 'audio.wav');
            formData.append('from', from);
            formData.append('to', to);
            console.log(formData);

            const response = await fetch('http://localhost:5155/api/audio/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Аудио успешно загружено');
                setOriginal(data.result.from);
                setTranslate(data.result.to);
            } else if (response.status === 400){
                setError("Select language");
                console.log(data);
            }
        } catch (error) {
            console.error('Ошибка при загрузке аудио:', error);
            setError('Произошла ошибка. Пожалуйста, попробуйте снова.');
        }finally {

            setLoading(false);
        }
    };


    return (
        <div className={'container-body'}>
            <h1>Translator</h1>

            <form onSubmit={startRecording}>

                <div className="button-container">
                    <button type='submit' className="btn start-stop" disabled={isRecording}>Start</button>

                    <button className="btn start-stop" onClick={stopRecording} disabled={!isRecording}>Stop</button>

                </div>
                <div className={"center-div"}> {loading &&
                    <OrbitProgress variant="track-disc" color="white" size="medium" text="" textColor=""/>}</div>
                <div className={'lang-container'}>
                    <Dropdown
                        options={options}
                        value={from}
                        onChange={setFrom}
                    />

                    <h4>to</h4>

                    <Dropdown
                        options={options}
                        value={to}
                        onChange={setTo}
                    />
                </div>

            </form>

            <div className="lang-container">
                <div className={'text-block'}>
                    <p id={'original'}>{original}</p>
                </div>
                <div className={'text-block'}>
                    <p id={'translate'}>{translate}</p>
                   
                </div>
            </div>

            <div className={"error"}>
                <p>{error}</p>
            </div>

        </div>
    );

}

export default Translator;

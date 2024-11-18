import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../translator.css';

import Dropdown from "../Dropdown.jsx";


function Translator() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);

    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const options = ['ru-RU', 'en-US', 'fr-FR', 'es-ES'];

    const [original, setOriginal] = useState('');
    const [translate, setTranslate] = useState('');

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
        setAudioUrl(null);
        console.log(`Recording in ${original}, translating to ${translate}`);

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
            const newAudioUrl = URL.createObjectURL(audioBlob);

            setAudioUrl(newAudioUrl);
            console.log("audio url on start ...." + audioUrl);

            uploadAudio(audioBlob);
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
    };

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const uploadAudio = (audioBlob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob, 'audio.wav');

        fetch('http://localhost:5155/api/audio/upload', {
            method: 'POST',
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => console.log('Аудио успешно загружено', data))
            .catch((error) => console.error('Ошибка при загрузке аудио:', error));
    };

    return (
        <div className={'container-body'}>
            <h1>Translator</h1>

            <form onSubmit={startRecording}>

                <div className="button-container">
                    <button type='submit' className="btn start-stop"  disabled={isRecording}>Start</button>

                    <button className="btn start-stop" onClick={stopRecording} disabled={!isRecording}>Stop</button>
                </div>

                <div className={'lang-container'}>
                    <Dropdown
                        options={options}
                        value={original}
                        onChange={setOriginal}
                    />

                    <h4>to</h4>

                    <Dropdown
                        options={options}
                        value={translate}
                        onChange={setTranslate}
                    />
                </div>


            </form>

            <div className="lang-container">
                <div className={'text-block'}>
                    <p id={'original'}></p>
                </div>
                <div className={'text-block'}>
                    <p id={'translate'}></p>
                </div>
            </div>


        </div>
    );

}

export default Translator;

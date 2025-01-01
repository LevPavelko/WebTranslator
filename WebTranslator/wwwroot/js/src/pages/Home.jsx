import '../index.css';
import '../login.css';
import { useNavigate } from 'react-router-dom';
import {useState} from "react";

function Home() {
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();



    const handGetStarted = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:5155/api/home/checkCookie', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }

            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                navigate('/translator')
            }else if (response.status === 401) {

                navigate('/login');
            }

        } catch (err) {
            console.log(err);

        }
    };
    
    return (
        <div >
            <h1 className={'text'}>WebTranslator - is a simple website that allow transform your speech to different languages</h1>
            <div className={'center-div'} style={{'marginTop': '15%'}}>
                <button className={'btn get-started'} onClick={handGetStarted}>Get started</button>
            </div>

        </div>
    );
}

export default Home;
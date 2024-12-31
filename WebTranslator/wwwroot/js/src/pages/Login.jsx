import '../login.css';
import '../index.css';
import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [isLoginActive, setIsLoginActive] = useState(true); // State to toggle between login and register
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {

        const container = document.querySelector('.container');
        const registerBtn = document.getElementById('register-btn');
        const loginBtn = document.getElementById('login-btn');


        if (registerBtn && loginBtn) {
            registerBtn.addEventListener('click', () => {
                setIsLoginActive(false); // Set state to show registration
            });

            loginBtn.addEventListener('click', () => {
                setIsLoginActive(true); // Set state to show login
            });
        }

        return () => {
            if (registerBtn && loginBtn) {
                registerBtn.removeEventListener('click', () => {});
                loginBtn.removeEventListener('click', () => {});
            }
        };
    }, []);

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }

        document.cookie = name + "=" + (value || "") + expires + "; path=/; Secure; ";
    }





    const handleLogin = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch('http://localhost:5155/api/user/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })

            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setCookie("isLogin", "true", 7);
                console.log('Login successful', data);
                navigate('/')
            }else if (response.status === 401) {

                setError(data.message);
            }
            else {
                setError(data.message || 'Login failed');
                console.log(data.message);
            }
        } catch (err) {
            console.log(err);
            setError('An error occurred. Please try again.');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            if(password != confirmPassword) {
                setError("Passwords don't match");
            }
            const response = await fetch('http://localhost:5155/api/user/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            console.log(response);
            const data = await response.json();

            if (response.ok) {
                setCookie("isLogin", "true", 7);
                navigate("/");
                console.log('Registration successful');

            }
            else if (response.status === 401) {

                setError(data.message );
            }
            else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            console.log(err);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <div className={`container ${!isLoginActive ? 'active' : ''}`}>

                {isLoginActive ? (
                    <div className="form-box login">
                        <form onSubmit={handleLogin}>
                            <h1>Login</h1>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <i className="bx bxs-user"></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="bx bxs-lock-alt"></i>
                            </div>
                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="btn" id="submitLogin">Login</button>
                        </form>
                    </div>
                ) : (

                    <div className="form-box register">
                        <form onSubmit={handleRegister}>
                            <h1>Registration</h1>
                            <div className="input-box">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <i className="bx bxs-user"></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Confirm password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <i className="bx bxs-envelope"></i>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <i className="bx bxs-lock-alt"></i>
                            </div>
                            {error && <div className="error-message">{error}</div>}

                            <button type="submit" className="btn" id="submitReg">Register</button>
                        </form>
                    </div>
                )}


                <div className="toggle-box">
                    <div className="toggle-panel toggle-left">
                        <h1>Hello, Welcome!</h1>
                        <p>Don't have an account?</p>
                        <button className="btn register-btn" id="register-btn">
                            Register
                        </button>
                    </div>

                    <div className="toggle-panel toggle-right">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account?</p>
                        <button className="btn login-btn" id="login-btn">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;

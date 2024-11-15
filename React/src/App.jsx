
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import Home from './pages/Home.jsx';
import './App.css';
import Login from "./pages/Login.jsx";
import Navigation from "./Navigation.jsx";
import Translator from "./pages/Translator.jsx";

function App() {
    return (
        <Router>
            <div>
                <Navigation />
                <Routes>

                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/translator" element={<Translator />} />

                </Routes>
            </div>
        </Router>
    );
}
export default App;
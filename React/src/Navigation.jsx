import { Link } from 'react-router-dom';
import './menu.css';

function Navigation() {
    return (
        <nav>
            <ul className="menu">
                <li><Link to="/">Home</Link></li>
                <li ><Link to="/login">Login</Link></li>

            </ul>

        </nav>
    );
}

export default Navigation;


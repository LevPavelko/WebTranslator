import { useState } from "react";

const Dropdown = ({ options, value, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeOption, setActiveOption] = useState(value);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setActiveOption(option);
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <div className="select" onClick={toggleDropdown}>
                <span className={`selected ${value === '' ? 'placeholder' : ''}`}>
                    {value || 'Select an option'}
                </span>
                <span className={`caret ${isOpen ? 'caret-rotate' : ''}`}>&#9660;</span>
            </div>
            <ul className={`options-container ${isOpen ? 'options-container-open' : ''}`}>
                {/* eslint-disable-next-line react/prop-types */}
                {options.map((option, index) => (
                    <li
                        key={index}
                        className={`option ${activeOption === option ? 'active' : ''}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dropdown;

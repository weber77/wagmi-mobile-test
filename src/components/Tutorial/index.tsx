import React from 'react';

interface TutorialProps {
    onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white rounded-xl shadow-sm shadow-gray-200 p-8 max-w-3xl w-full relative">
                <button 
                    onClick={onClose} 
                    className="text-black font-bold text-xl absolute top-0 right-0 m-4"
                >
                    &times;
                </button>
                <img src="/Telegram_Tutorial.jpeg" alt="Tutorial" className="mb-4" />
                <p className="text-center text-paalBackground font-lato font-semibold">
                Making the payment or not, you need to launch the bot from Telegram.
                </p>
            </div>
        </div>
    );
};

export default Tutorial;

import React from 'react';

type ButtonProps = {
    iconPath: string;
    width: number;
    height: number;
};

const IconButton: React.FC<ButtonProps> = ({iconPath, width, height}) => {
    return (
        <button type="button" className=" hover:text-gray-400">
            <svg
                width={width}
                height={height}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={iconPath} fill="currentColor"/>
            </svg>
        </button>
    );
};

export default IconButton;

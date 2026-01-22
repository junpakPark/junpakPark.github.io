import React from 'react';

type ButtonProps = {
    iconPath: string;
    width: number;
    height: number;
    ariaLabel?: string;
};

const IconButton: React.FC<ButtonProps> = ({iconPath, width, height, ariaLabel}) => {
    return (
        <button type="button" className=" hover:text-gray-400" aria-label={ariaLabel}>
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

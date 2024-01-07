import React from 'react';

type ButtonProps = {
    iconPath: string;
    width: number;
    height: number;
};

const IconButton: React.FC<ButtonProps> = ({iconPath, width, height}) => {
    return (
        <button
            type="button"
            id="headlessui-listbox-button-:R19kcr6:"
            aria-haspopup="true"
            aria-expanded="false"
            data-headlessui-state=""
            aria-labelledby="headlessui-listbox-label-:Rpkcr6: headlessui-listbox-button-:R19kcr6:"
        >
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

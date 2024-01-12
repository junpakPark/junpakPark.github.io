import React, {useEffect, useState} from 'react';
import {FEATURES} from "../constants";
import IconButton from './IconButton';

const Header: React.FC = () => {
    const [width, setWidth] = useState(0);

    const scrollHeight = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight;
        const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;

        setWidth(percent);
    };

    useEffect(() => {
        window.addEventListener('scroll', scrollHeight);
        return () => window.removeEventListener('scroll', scrollHeight);
    }, []);

    return (
        <>
            <header
                className="sticky top-0 left-0 w-full z-50  backdrop-blur transition-colors duration-500 bg-white border-gray-200 "
            >
                <nav className="flex space-x-8 justify-end items-center h-12 mx-auto px-8 max-w-screen-xl">
                    {FEATURES.map((feature) => (
                        <a
                            key={feature.name}
                            href={`/${feature.name}`}>
                            <IconButton iconPath={feature.path} width={20} height={20}/>
                        </a>
                    ))}
                </nav>
                <hr/>
            </header>
            <div
                className="fixed top-12 left-0 md:left-[260px] 2xl:left-[350px] h-1 z-50 bg-gradient-to-r from-pink-100 to-purple-600 rounded-tr-sm"
                style={{width: `${width}%`}}
            />
        </>
    );
};

export default Header;

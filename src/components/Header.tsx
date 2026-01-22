import React, {useEffect, useRef, useState} from 'react';
import {FEATURES} from "../constants";
import IconButton from './IconButton';

const Header: React.FC = () => {
    const [width, setWidth] = useState(0);
    const ticking = useRef(false);

    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;
            const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
            setWidth(percent);
            ticking.current = false;
        };

        const onScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(updateScrollProgress);
                ticking.current = true;
            }
        };

        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
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
                            href={`/${feature.name}`}
                            aria-label={feature.name}>
                            <IconButton iconPath={feature.path} width={20} height={20} ariaLabel={feature.name}/>
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

import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from "../constants";
import IconButton from './IconButton';


const Logo: React.FC = () => {
    return (
        <a className="mr-3 flex space-x-4 w-[2.0625rem] overflow-hidden md:w-auto" href="/">
            <svg width="19" height="24" viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.44199 5.23365C5.09758 3.7294 5.75987 2.20977 7.16338 1.36018C8.84632 0.341438 10.8717 -0.405531 12.7293 0.242011C14.6738 0.919832 15.7871 2.82443 16.683 4.67857C17.67 6.72132 18.547 8.90177 17.9744 11.097C17.3153 13.6241 15.9645 16.4513 13.439 17.1161C11.4445 17.6412 9.66635 16.2555 7.96129 14.9268C7.56808 14.6204 7.17877 14.3171 6.79158 14.0408C5.29797 12.9753 3.89078 11.7354 3.41336 9.96387C3.01278 8.47745 3.6511 7.02943 4.27547 5.61309C4.32633 5.49771 4.3771 5.38253 4.42721 5.26757L4.44199 5.23365Z"
                    fill="#464646"></path>
                <path
                    d="M0.267961 17.6163C0.991244 16.253 2.67914 15.1768 4.35503 15.106C5.34861 15.064 5.99255 15.6915 6.65536 16.3373C7.01369 16.6865 7.37754 17.041 7.80514 17.298C8.1734 17.5194 8.62689 17.6641 9.07318 17.8064C9.89456 18.0685 10.6915 18.3227 10.8878 19.033C11.1447 19.9623 10.3152 20.8323 9.54159 21.6438C9.39953 21.7928 9.25935 21.9398 9.12813 22.0849C8.4172 22.8708 7.60201 23.5861 6.51941 23.8621C5.42777 24.1403 4.31879 23.9766 3.34456 23.5591C2.29278 23.1083 1.45469 22.4182 0.971148 21.4842C0.952454 21.4481 0.933653 21.4119 0.914788 21.3755C0.297316 20.1852 -0.390973 18.8583 0.267961 17.6163Z"
                    fill="#464646"></path>
            </svg>
            <h1 className="hs-collapse hidden font-bold overflow-hidden transition-all duration-300 basis-full grow md:block">
                준팍.log
            </h1>
        </a>
    );
};

enum CategoriesType {
    Normal = "hidden sm:block",
    Toggle = "",
}

export type Category = {
    name: string;
    url: string;
};

interface CategoriesProps {
    categories: Category[];
    type: CategoriesType;
}

const Categories: React.FC<CategoriesProps> = ({ categories, type }) => {
    return (
        <nav className={`leading-6 ml-auto hs-collapse overflow-hidden ${type} transition-all duration-300 basis-full grow sm:block`}>
            <ul className="flex flex-col gap-8 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5">
                {categories.map((category) => (
                    <li key={category.url}>
                        <a
                            className="text-gray-700 hover:underline"
                            href={category.url}>
                            {category.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

const features = [
    "M20 18.954L14.4133 13.3673C15.7558 11.7556 16.4253 9.68835 16.2825 7.59562C16.1396 5.50288 15.1954 3.54579 13.6464 2.13146C12.0973 0.717125 10.0626 -0.0455437 7.96554 0.00210549C5.86847 0.0497547 3.87051 0.904053 2.38728 2.38728C0.904053 3.87051 0.0497547 5.86847 0.00210549 7.96554C-0.0455437 10.0626 0.717125 12.0973 2.13146 13.6464C3.54579 15.1954 5.50288 16.1396 7.59562 16.2825C9.68835 16.4253 11.7556 15.7558 13.3673 14.4133L18.954 20L20 18.954ZM1.50598 8.16382C1.50598 6.84703 1.89645 5.5598 2.62803 4.46492C3.3596 3.37004 4.39941 2.51669 5.61598 2.01277C6.83254 1.50886 8.17121 1.37701 9.46271 1.6339C10.7542 1.8908 11.9405 2.5249 12.8716 3.45601C13.8028 4.38713 14.4369 5.57345 14.6937 6.86494C14.9506 8.15644 14.8188 9.49511 14.3149 10.7117C13.811 11.9282 12.9576 12.9681 11.8627 13.6996C10.7678 14.4312 9.48062 14.8217 8.16382 14.8217C6.39865 14.8197 4.70634 14.1176 3.45818 12.8695C2.21001 11.6213 1.50793 9.92899 1.50598 8.16382Z",
    "M5.5 7C5.10218 7 4.72064 6.84196 4.43934 6.56066C4.15804 6.27936 4 5.89782 4 5.5C4 5.10218 4.15804 4.72064 4.43934 4.43934C4.72064 4.15804 5.10218 4 5.5 4C5.89782 4 6.27936 4.15804 6.56066 4.43934C6.84196 4.72064 7 5.10218 7 5.5C7 5.89782 6.84196 6.27936 6.56066 6.56066C6.27936 6.84196 5.89782 7 5.5 7ZM21.41 11.58L12.41 2.58C12.05 2.22 11.55 2 11 2H4C2.89 2 2 2.89 2 4V11C2 11.55 2.22 12.05 2.59 12.41L11.58 21.41C11.95 21.77 12.45 22 13 22C13.55 22 14.05 21.77 14.41 21.41L21.41 14.41C21.78 14.05 22 13.55 22 13C22 12.44 21.77 11.94 21.41 11.58Z",
    "M2.80206 14.8359C3.54521 14.8359 4.25792 15.1311 4.78341 15.6566C5.3089 16.1821 5.60411 16.8948 5.60411 17.6379C5.60411 19.1547 4.34447 20.44 2.80206 20.44C1.28535 20.44 0 19.1547 0 17.6379C0 16.8948 0.295216 16.1821 0.820704 15.6566C1.34619 15.1311 2.0589 14.8359 2.80206 14.8359ZM0 0.440002C5.30433 0.440002 10.3914 2.54714 14.1421 6.29787C17.8929 10.0486 20 15.1357 20 20.44H16.3625C16.3625 16.1004 14.6386 11.9385 11.57 8.86999C8.50145 5.80143 4.3396 4.07753 0 4.07753V0.440002ZM0 7.71507C3.37486 7.71507 6.6115 9.05573 8.99789 11.4421C11.3843 13.8285 12.7249 17.0651 12.7249 20.44H9.0874C9.0874 18.0299 8.12998 15.7185 6.42576 14.0142C4.72155 12.31 2.41013 11.3526 0 11.3526V7.71507Z"
];

const FeatureButtons: React.FC = () => {
    return (
        <div
            className="hidden md:flex space-x-6 items-center border-l border-slate-200 ml-6 pl-6"
        >
            {features.map((iconPath) => (
                <IconButton key={iconPath} iconPath={iconPath} width={20} height={20} />
            ))}
        </div>
    )
}

interface MobileMenuButtonProps {
    onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
    return (
        <button onClick={onClick} type="button" className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <span className="sr-only">Open main menu</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 17.5C20.3852 17.5002 20.7556 17.6486 21.0344 17.9144C21.3132 18.1802 21.479 18.5431 21.4975 18.9279C21.516 19.3127 21.3858 19.6898 21.1338 19.9812C20.8818 20.2726 20.5274 20.4558 20.144 20.493L20 20.5H4C3.61478 20.4998 3.24441 20.3514 2.96561 20.0856C2.68682 19.8198 2.52099 19.4569 2.50248 19.0721C2.48396 18.6873 2.61419 18.3102 2.86618 18.0188C3.11816 17.7274 3.47258 17.5442 3.856 17.507L4 17.5H20ZM20 10.5C20.3978 10.5 20.7794 10.658 21.0607 10.9393C21.342 11.2206 21.5 11.6022 21.5 12C21.5 12.3978 21.342 12.7794 21.0607 13.0607C20.7794 13.342 20.3978 13.5 20 13.5H4C3.60218 13.5 3.22064 13.342 2.93934 13.0607C2.65804 12.7794 2.5 12.3978 2.5 12C2.5 11.6022 2.65804 11.2206 2.93934 10.9393C3.22064 10.658 3.60218 10.5 4 10.5H20ZM20 3.5C20.3978 3.5 20.7794 3.65804 21.0607 3.93934C21.342 4.22064 21.5 4.60218 21.5 5C21.5 5.39782 21.342 5.77936 21.0607 6.06066C20.7794 6.34196 20.3978 6.5 20 6.5H4C3.60218 6.5 3.22064 6.34196 2.93934 6.06066C2.65804 5.77936 2.5 5.39782 2.5 5C2.5 4.60218 2.65804 4.22064 2.93934 3.93934C3.22064 3.65804 3.60218 3.5 4 3.5H20Z" fill="#464646" />
            </svg>
        </button>
    );
};

const Header: React.FC = () => {
    const [width, setWidth] = useState(0);
    const [onToggle, setOnToggle] = useState<boolean>(false);

    const handleToggle = () => {
        setOnToggle((prev) => !prev);
    };

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
                className="sticky top-0 left-0 w-full z-10 backdrop-blur transition-colors duration-500 bg-white border-gray-200 "
            >
                <nav className="flex flex-wrap justify-between items-center h-12 mx-auto px-8 max-w-screen-xl">
                    <Logo />
                    <div className="flex flex-nowrap items-center">
                        <Categories categories={CATEGORIES} type={CategoriesType.Normal} />
                        <FeatureButtons />
                        <MobileMenuButton onClick={handleToggle} />
                    </div>
                    <div
                        className={`w-full h-screen absolute top-12 left-0 bg-white flex-col flex-nowrap flex ${onToggle ? 'block' : 'hidden'}`}
                    >
                        <Categories categories={CATEGORIES} type={CategoriesType.Toggle} />
                    </div>
                </nav>
            </header>
            <div
                className="fixed top-12 left-0 h-1 z-50 bg-gradient-to-r from-pink-100 to-purple-200 rounded-tr-sm"
                style={{ width: `${width}%` }}
            />
        </>
    );
};

export default Header;

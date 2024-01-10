import React from 'react';
import SocialButtons from './SocialButtons';
import {SOCIAL_MEDIAS} from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white">
            <hr className="border-gray-200 sm:mx-auto"/>
            <div className="flex flex-col items-center justify-between sm:flex-row mx-auto max-w-screen-xl p-8">
        <span className="order-2 sm:order-none text-sm text-gray-500 sm:text-center">
            © 2024 준팍 기술 블로그. All Rights Reserved.
        </span>
                <SocialButtons
                    className="order-1 sm:order-none text-gray-500 hover:text-black mb-4 sm:mb-0"
                    socialMedias={SOCIAL_MEDIAS}
                />
            </div>
        </footer>
    );
};

export default Footer;

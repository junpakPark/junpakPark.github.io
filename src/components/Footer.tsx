import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white p-8 border-t">
            <span className="block text-sm text-gray-500 text-center mx-auto">
                    © {new Date().getFullYear()} 준팍 기술 블로그. All Rights Reserved.
            </span>
        </footer>
    );
};

export default Footer;

import React from 'react'
import IconButton from './IconButton';

export interface SocialMedia {
    name: string;
    url: string;
    d: string;
}

interface SocialButtonsProps {
    socialMedias: SocialMedia[];
    className?: string;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({ socialMedias, className = '' }) => {
    return (
        <div className="flex py-2 mt-4 space-x-6 sm:justify-center sm:mt-0">
            {socialMedias.map((socialMedia, index) => (
                <a
                    key={index}
                    href={socialMedia.url}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to ${socialMedia.name}`}
                >
                    <IconButton iconPath={socialMedia.d} height={20} width={20} />
                </a>
            ))}
        </div>
    );
}

export default SocialButtons

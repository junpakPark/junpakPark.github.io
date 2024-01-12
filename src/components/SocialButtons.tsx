import React from 'react'
import IconButton from './IconButton';
import type {SocialMedia} from "../constants.ts";

interface SocialButtonsProps {
    socialMedias: SocialMedia[];
    className?: string;
}

const SocialButtons: React.FC<SocialButtonsProps> = ({socialMedias, className = ''}) => {
    return (
        <div className="flex mx-auto space-x-8 justify-center items-center text-black">
            {socialMedias.map((socialMedia, index) => (
                <a
                    key={index}
                    href={socialMedia.url}
                    className={className}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to ${socialMedia.name}`}
                >
                    <IconButton iconPath={socialMedia.d} height={20} width={20}/>
                </a>
            ))}
        </div>
    );
}

export default SocialButtons

import React from 'react';
import '../../styles/style.css';

interface ContentSectionItem {
    id: string;
    title: string;
    content: string;
}

interface ContentSectionProps {
    sections: ContentSectionItem[];
}

const ContentSection: React.FC<ContentSectionProps> = ({ sections }) => {
    return (
        <div className="">
            <div id="scrollspy-2" className="space-y-4">
                {sections.map(section => (
                    <div key={section.id} id={section.id} className='scroll-margin-top-120'>
                        <h3 className="text-lg font-semibold dark:text-white">{section.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-gray-400">{section.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ContentSection;

import React from 'react';
import { slugify } from '../utils'

interface TagsProps {
    tags: string[];
}

const TagList: React.FC<TagsProps> = ({ tags }) => {
    return (
        <div className="flex mt-4 justify-center">
            {tags.map((tag, index) => (
                <a
                    key={index}
                    href={`/tags/${slugify(tag)}`}
                    className="px-2 py-1 border text-white rounded-full text-xs mr-2"
                >
                    {tag}
                </a>
            ))}
        </div>
    );
};

export default TagList;

import React from 'react';
import {slugify} from '../utils'

interface TagProps {
    name: string;
    tagCount?: number;
}

const Tag: React.FC<TagProps> = ({name, tagCount}) => {
    return (
        <a
            href={`/tags/${slugify(name)}`}
            className="px-4 my-1 mr-2 text-purple-800 text-md font-thin bg-purple-100 rounded-full hover:text-purple-100 hover:bg-purple-500 transition ease-in-out"
        >
            {name} {tagCount != null && <span> ({tagCount})</span>}
        </a>

    );
};

interface TagListProps {
    tags: string[];
    tagCounts?: { [tag: string]: number };
}

const TagList: React.FC<TagListProps> = ({tags, tagCounts}) => {
    return (
        <div className="flex flex-wrap mt-4 mb-8">
            {tags.map((tag, index) => (
                <Tag key={index} name={tag} tagCount={tagCounts ? tagCounts[tag] : undefined} />
            ))}
        </div>
    );
};

export default TagList;

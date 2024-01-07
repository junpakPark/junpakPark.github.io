import React from 'react';
import type { CollectionEntry } from 'astro:content';
import { formatDate, slugify, calculateReadingTime } from "../../utils";

interface TagProps {
    name: string;
}

const Tag: React.FC<TagProps> = ({ name }) => {
    return (
        <span className="bg-gray-600 text-gray-300 text-s font-thin me-2 px-2.5 py-0.5 rounded-full">
            <a href={`/tags/${slugify(name)}`}>
                {name}
            </a>
        </span>
    );
};

interface TagListProps {
    tags: string[];
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
    return (
        <div className="mb-12">
            {tags.map((tag, index) => (
                <Tag key={index} name={tag} />
            ))}
        </div>
    );
};

interface ArticleHeaderProps {
    article: CollectionEntry<'blog'>;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ article }) => {
    const { title, date, tags } = article.data;
    
    return (
        <header className='mb-16'>
            <h1 className="font-bold text-4xl mb-4">{title}</h1>
            <p className='mb-4'>
                <time className='font-thin text-gray-500 dark:text-gray-400'>{formatDate(date)}</time>
                <span className='font-light text-gray-500 dark:text-gray-400'> | {calculateReadingTime(article.body)}</span>
            </p>
            <TagList tags={tags} />
            <hr />
        </header>
    );
};

export default ArticleHeader;

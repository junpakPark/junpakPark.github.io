import React from 'react';
import type {CollectionEntry} from 'astro:content';
import {calculateReadingTime, formatDate} from "../../utils";
import TagList from '../TagList';

interface ArticleHeaderProps {
    article: CollectionEntry<'blog'>;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({article}) => {
    const {title, date, tags} = article.data;

    return (
        <header className='space-y-6 mb-16'>
            <h1 className="font-bold text-4xl">{title}</h1>
            <p>
                <time className='font-thin text-gray-500'>{formatDate(date)} | </time>
                <span
                    className='font-light text-gray-500'>{calculateReadingTime(article.body)}</span>
            </p>
            <TagList tags={tags}/>
            <hr/>
        </header>
    );
};

export default ArticleHeader;

import React from 'react';
import {formatDate, slugify} from "../utils";
import type {CollectionEntry} from 'astro:content';

interface ArticleCardProps {
    article: CollectionEntry<'blog'>;
}

const ArticleCard: React.FC<ArticleCardProps> = ({article}) => {
    const {title, thumbnail, description, date, tags} = article.data;

    return (
        <div className="max-w-xs mx-auto mt-10">
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <a href={`/${slugify(article.data.category)}/posts/${slugify(article.slug)}`}>
                    <img
                        src={`/images/${thumbnail}`}
                        alt="Article Thumbnail"
                        className='w-full h-48 object-cover'
                    />
                </a>

                <div className="p-6">
                    <a href={`/${slugify(article.data.category)}/posts/${slugify(article.slug)}`}>
                        <h2 className="text-xl font-semibold mb-2">{title}</h2>
                        <p className="font-light text-gray-500 mb-4">
                            <time className='font-thin'>{formatDate(date)}</time>
                        </p>
                        <p className="mt-1">
                            {description}
                        </p>
                    </a>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <a key={index} href={`/tags/${slugify(tag)}`}
                               className="bg-gray-600 text-gray-300 text-sm font-thin px-2.5 py-0.5 rounded-full">
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ArticleCard;

import React from 'react'
import {type CollectionEntry} from 'astro:content';
import {getMostRecentDateFormatted, slugify} from "../utils.ts";

interface SeriesProps {
    seriesPosts: CollectionEntry<'blog'>[];
    seriesData: CollectionEntry<'series'>["data"];
    currentPost: CollectionEntry<'blog'>;
}


const SeriesPosts: React.FC<SeriesProps> = ({seriesPosts, seriesData, currentPost}) => {
    return (
        <details open className="border rounded-xl p-8 text-gray-700 space-y-4 [&_svg]:open:rotate-0">
            <summary className="list-none">
                <a
                    href={`/series/${slugify(seriesData.title)}`}
                    className="space-y-2">
                    <label
                        className="text-sm font-medium inline-flex border-b-2 border-solid border-purple-600 text-purple-600">{seriesData.title}</label>
                    <p className="text-2xl font-semibold">{seriesData.description}</p>
                </a>
                <div className="flex justify-between items-center">
                    <p className="text-xs">
                        <span className="text-purple-600">{seriesPosts.length}</span> Posts |
                        Last updated on {getMostRecentDateFormatted(seriesPosts)}
                    </p>
                    <div className="cursor-pointer">
                        <svg
                            className="border rounded-full shadow-inner -rotate-180 transform transition-all duration-300" fill="none"
                            height="20" width="20" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                </div>
            </summary>
            <hr/>
            <ol className="mt-4 space-y-1 ">

                {seriesPosts.map((post, index) => (
                    <li key={index}>
                        <a
                            href={`/posts/${slugify(post.slug)}`}
                            className={`${post.slug === currentPost.slug ? "font-semibold text-purple-600" : ""}`}
                        >
                            {`${index + 1}. `} {post.data.title}
                        </a>
                    </li>
                ))}
            </ol>
        </details>

    );
};

export default SeriesPosts;

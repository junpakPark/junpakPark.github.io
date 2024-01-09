import React from 'react'
import {calculateReadingTime, formatDate, slugify, truncateText} from "../utils";
import type {CollectionEntry} from 'astro:content';
import TagList from "./TagList.tsx";

interface PostItemProps {
    post: CollectionEntry<'blog'>;
    index?: number;
}

const PostItem: React.FC<PostItemProps> = ({post, index}) => {
    const {title, date, tags} = post.data;

    return (
        <li className="py-4 text-gray-400">
            <a href={`/tech/${slugify(post.slug)}`}>
                <h2 className="mb-8 text-4xl font-bold text-gray-700">{index !== undefined ? `(${index + 1})` : null} {title}</h2>
                <p className='font-light'>{truncateText(post.body, 200)}</p>
                <p className='text-sm font-light text-right'>
                    <time className='font-thin'>{formatDate(date)} | </time>
                    <span>{calculateReadingTime(post.body)}</span>
                </p>
            </a>
            <TagList tags={tags}/>
            <hr/>
        </li>
    );
};

interface PostListProps {
    posts: CollectionEntry<'blog'>[];
    isIndexed: boolean;
}

const PostList: React.FC<PostListProps> = ({posts, isIndexed}) => {
    return (
        <ul className="flex flex-col">
            {posts.map((post, index) => <PostItem key={post.slug} index={isIndexed ? index : undefined} post={post}/>)}
        </ul>
    );
}

export default PostList;

import React from 'react'
import {calculateReadingTime, formatDate, slugify, truncateText} from "../utils";
import type {CollectionEntry} from 'astro:content';
import TagList from "./TagList.tsx";

interface PostItemProps {
    post: CollectionEntry<'blog'>;
}

const PostItem: React.FC<PostItemProps> = ({post}) => {
    const {title, category, date, tags} = post.data;

    return (
        <li className="py-4 text-gray-400">
            <a
                href={`/${slugify(category)}/posts/${slugify(post.slug)}`}
            >
                <h2 className="mb-8 text-4xl font-bold text-gray-700">{title}</h2>

                <p className='font-light'>{truncateText(post.body, 200)}</p>
                <div className='text-sm font-light text-right'>
                    <time className='font-thin'>{formatDate(date)} |</time>
                    <span>{calculateReadingTime(post.body)}</span>
                </div>
            </a>
            <TagList tags={tags}/>

            <hr/>
        </li>
    );
};

interface PostListProps {
    posts: CollectionEntry<'blog'>[];
}

const PostList: React.FC<PostListProps> = ({posts}) => {
    return (
        <ul className="flex flex-col">
            {posts.map((post) => <PostItem key={post.slug} post={post} />)}
        </ul>
    );
}

export default PostList;

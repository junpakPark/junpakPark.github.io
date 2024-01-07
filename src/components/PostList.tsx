import React from 'react'
import {calculateReadingTime, formatDate, slugify} from "../utils";
import type {CollectionEntry} from 'astro:content';
import TagList from "./TagList.tsx";

interface PostItemProps {
    post: CollectionEntry<'blog'>;
    index: number
}

const PostItem: React.FC<PostItemProps> = ({post, index}) => {
    const {title, category, description, date, tags} = post.data;

    return (
        <div className="flex space-x-6">
            <div className="pt-4 font-bold">{index + 1}</div>
            <div className="text-ye group w-full py-4 hover:drop-shadow-base">
                <a className="hover:drop-shadow-base" href={`/${slugify(category)}/posts/${slugify(post.slug)}`}>
                    <p className="text-xl font-bold">{title}</p>
                    <p className="text-tertiary mt-1">{description}</p>
                </a>
                <div className="mt-2 inline-flex w-full items-start gap-2 text-sm">
                    <div className="flex flex-wrap items-center gap-2">
                        <TagList tags={tags}/>
                    </div>
                    <div className="ml-auto flex gap-2 whitespace-nowrap group-hover:drop-shadow-base-bold">
                        <div className="flex items-center gap-1 text-xs">
                            <time className='font-thin'>{formatDate(date)}</time>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <span>| {calculateReadingTime(post.body)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface PostListProps {
    posts: CollectionEntry<'blog'>[];
}

const PostList: React.FC<PostListProps> = ({posts}) => {
    return (
        <div className="flex flex-col">
            {posts.map((post, index) => <PostItem key={post.slug} post={post} index={index}/>)}
        </div>
    );
}

export default PostList;

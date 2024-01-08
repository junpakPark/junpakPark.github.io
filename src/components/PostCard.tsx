import React from 'react'
import { formatDate, slugify } from '../utils'
import type { CollectionEntry } from 'astro:content'

interface PostProps {
    post: CollectionEntry<'blog'>;
}

interface TagListProps {
    tags: string[];
    limitCount: number;
}

const TagList: React.FC<TagListProps> = ({ tags, limitCount }) => {
    return (
        <>
            {tags.slice(0, limitCount).map((tag, index) => (
                <span key={index} className="px-2 py-0.5 border text-white rounded-full text-xs m-1">
                    {tag}
                </span>
            ))}
            {tags.length > limitCount && (
                <span className="pr-2 py-0.5 border border-transparent text-white rounded-full text-xs m-1">
                    외 {tags.length - limitCount}개
                </span>
            )}
        </>
    )
};


const PostCard: React.FC<PostProps> = ({ post }) => {
    const { title, thumbnail, description, date, tags } = post.data;

    return (
        <div
            className="relative w-96 h-64 mx-auto my-4 rounded-xl shadow-md"
            style={{ backgroundImage: `url('/images/${thumbnail}')`, backgroundSize: 'cover' }}
        >
            <a href={`/posts/${slugify(post.slug)}`}>
                <div className="absolute flex flex-col space-y-4 items-center justify-center rounded-xl inset-0 border border-slate-100	 border-solid bg-[#640028]/10 backdrop-blur-sm hover:backdrop-blur-md hover:bg-black/40 text-[#F4F4FF] text-center hover:text-white transition duration-300 ease-in-out">
                    <h2 className="text-md font-semibold sm:text-xl">{title}</h2>
                    <p className="text-sm font-thin">{formatDate(date)}</p>
                    <p className="text-sm font-light">{description}</p>
                    <div className="flex flex-wrap mt-4 justify-center">
                        <TagList tags={tags} limitCount={3} />
                    </div>
                </div>
            </a>
        </div>
    )
}

export default PostCard


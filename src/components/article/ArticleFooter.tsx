import React from 'react';
import SocialButtons from "../SocialButtons";
import type {CollectionEntry} from 'astro:content';
import {slugify} from "../../utils";
import {AUTHOR, SOCIAL_MEDIAS} from "../../constants";
import Comments from "../Comments.tsx";

interface NavigationLinkProps {
    post: CollectionEntry<'blog'>;
    direction: 'Prev' | 'Next';
}

const NavigationLink: React.FC<NavigationLinkProps> = ({post, direction}) => {
    const {title} = post.data;
    return (
        <a
            href={`/posts/${slugify(post.slug)}`}
            className={`group flex flex-col gap-1 ${direction === 'Next' ? 'ml-auto text-right' : ''} px-8 py-2 rounded-lg border border-transparent text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none`}
        >
            {direction}
            <span>{title}</span>
        </a>
    );
};

interface NavigationSectionProps {
    prevPost?: CollectionEntry<'blog'>;
    nextPost?: CollectionEntry<'blog'>;
}

const NavigationSection: React.FC<NavigationSectionProps> = ({prevPost, nextPost}) => {
    return (
        <section className="flex items-stretch justify-between gap-1">
            {prevPost && <NavigationLink post={prevPost} direction="Prev"/>}
            {nextPost && <NavigationLink post={nextPost} direction="Next"/>}
        </section>
    );
};

const ProfileComponent: React.FC = () => {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="flex items-center gap-4 sm:gap-8 sm:p-12">
                <div>
                    <img
                        src={AUTHOR.profileImage}
                        className="h-24 w-24 select-none overflow-hidden rounded-full"
                        alt="Profile Image"
                        draggable="false"
                        loading="lazy"
                        decoding="async"
                        width={96}
                        height={96}
                    />
                </div>
                <div className="space-y-1">
                    <div className="font-bold">{AUTHOR.name}</div>
                    <div className="text-tertiary text-sm">{AUTHOR.description}</div>
                    <SocialButtons
                        className="text-primary transition hover:text-secondary"
                        socialMedias={SOCIAL_MEDIAS}/>
                </div>
            </div>
        </div>
    );
};

const ArticleFooter: React.FC<NavigationSectionProps> = ({prevPost, nextPost}) => {
    return (
        <footer className='mt-16 mb-16'>
            <hr/>
            <ProfileComponent/>
            <NavigationSection prevPost={prevPost} nextPost={nextPost}/>
            <Comments />
        </footer>
    );
};

export default ArticleFooter;

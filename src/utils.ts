import type {CollectionEntry} from "astro:content";

const slugify = (text: string): string => {
    return text.toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-zA-Z0-9가-힣-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}


const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return new Date(date).toLocaleDateString(undefined, options);
};

interface PostFilterOptions {
    filterOutUnpublished?: boolean;
    filterOutFuturePosts?: boolean;
    sortByDate?: boolean;
    limit?: number;
}

const processPosts = (
    posts: CollectionEntry<'blog'>[],
    {
        filterOutUnpublished = true,
        filterOutFuturePosts = true,
        sortByDate = true,
        limit
    }: PostFilterOptions = {}
): CollectionEntry<'blog'>[] => {
    const isUnpublished = (post: CollectionEntry<'blog'>) => filterOutUnpublished && !post.data.published;
    const isFuturePost = (post: CollectionEntry<'blog'>) => filterOutFuturePosts && new Date(post.data.date) > new Date();
    const sortPostsByDate = (a: CollectionEntry<'blog'>, b: CollectionEntry<'blog'>) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime();

    const processedPosts = posts.filter(post => !(isUnpublished(post) || isFuturePost(post)))
        .sort(sortByDate ? sortPostsByDate : () => Math.random() - 0.5);

    return limit ? processedPosts.slice(0, limit) : processedPosts;
};



const calculateReadingTime = (text: string): string => {
    const wordsPerMinute = 270;
    const words = text.split(/\s+/).length;
    const totalReadingTimeMinutes = words / wordsPerMinute;

    return (
        totalReadingTimeMinutes < 1
            ? 'Less than a minute'
            : `${Math.ceil(totalReadingTimeMinutes)} min read`
    );
};

const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength + 1);
    const lastSpace = truncated.lastIndexOf(' ');

    if (lastSpace > 0) {
        return truncated.substring(0, lastSpace) + "···";
    }

    return truncated + "···";
};

export {slugify, formatDate, processPosts, calculateReadingTime, truncateText};

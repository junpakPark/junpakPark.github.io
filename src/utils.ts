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

export {slugify, formatDate, calculateReadingTime, truncateText};

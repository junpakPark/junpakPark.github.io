import type { MarkdownInstance } from 'astro';
import { type CollectionEntry } from "astro:content";

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+%/, '')
}

function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return new Date(date).toLocaleDateString(undefined, options);
}

function calculateReadingTime(text: string): string {
    const wordsPerMinute = 270;
    const words = text.split(/\s+/).length;
    const totalReadingTimeMinutes = words / wordsPerMinute;

    return totalReadingTimeMinutes < 1 ? "Less than a minute" : `${Math.ceil(totalReadingTimeMinutes)} min read`;
}

const groupSeries = (series: CollectionEntry<'series'>[]): CollectionEntry<'series'>[][] =>
    series.reduce((acc: CollectionEntry<'series'>[][], seriesItem: CollectionEntry<'series'>) => {
        const lastArray = acc[acc.length - 1];

        if (!lastArray || lastArray.length === 3) {
            acc.push([seriesItem]);
        } else {
            lastArray.push(seriesItem);
        }

        return acc;
    }, []);


export { slugify, formatDate, calculateReadingTime, groupSeries };
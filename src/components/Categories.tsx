import React from 'react';
import {type CollectionEntry} from "astro:content";
import {slugify} from "../utils.ts";

const groupCategoriesByMajor = (
    categories: CollectionEntry<"category">[]
): Record<string, CollectionEntry<"category">[]> => {
    return categories.reduce((grouped, category) => {
        const majorCategory: string = category.data.major;

        if (!grouped[majorCategory]) {
            grouped[majorCategory] = [];
        }

        grouped[majorCategory].push(category);

        return grouped;
    }, {} as Record<string, CollectionEntry<"category">[]>);
};

const countPostsPerCategory = (
    posts: CollectionEntry<"blog">[],
    categories: CollectionEntry<"category">[]
): Record<string, number> => {

    let categoryCounts: Record<string, number> = categories.reduce((acc: { [key: string]: number }, category) => {
        acc[category.id] = 0;
        return acc;
    }, {});

    posts.forEach(post => {
        const categoryName = post.data.category.id;
        if (categoryName in categoryCounts) {
            categoryCounts[categoryName]++;
        }
    });

    return categoryCounts;
};

interface MajorCategoryProps {
    major: string;
    categories: CollectionEntry<"category">[];
    categoryPostCounts: Record<string, number>;
}

const MajorCategory: React.FC<MajorCategoryProps> = React.memo(({major, categories, categoryPostCounts}) => (
    <div className="space-y-2">
        <h2 className="text-gray-400">{major}</h2>
        <ul className="ml-2 border-l-[1.5px] border-solid space-y-1">
            {categories.map((category) => (
                <li key={category.data.title} className="text-sm text-gray-400 pl-3">
                    <a href={`/tech/${slugify(category.id)}`}>
                        {category.data.title} ({categoryPostCounts[category.id]})
                    </a>
                </li>
            ))}
        </ul>
    </div>
));

interface CategoriesProps {
    categories: CollectionEntry<"category">[];
    posts: CollectionEntry<"blog">[];
}

const Categories: React.FC<CategoriesProps> = ({categories, posts}) => {
    const categoriesByMajor = groupCategoriesByMajor(categories);
    const categoryPostCounts = countPostsPerCategory(posts, categories);

    return (
        <div
            className="md:px-8 2xl:px-16  py-8 w-full space-y-2 border-t-[1px]">
            <h2 className="text-gray-400 mb-2">
                <a href="/tech">전체 글 보기 ({posts.length})</a>
            </h2>
            {
                Object.entries(categoriesByMajor).map(([major, categories]) => (
                    <MajorCategory
                        key={major}
                        major={major}
                        categories={categories}
                        categoryPostCounts={categoryPostCounts}
                    />
                ))
            }
        </div>
    )
        ;
};

export default Categories;

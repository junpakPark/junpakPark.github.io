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
    <div>
        <h2 className="font-semibold">{major}</h2>
        <ul>
            {categories.map((category) => (
                <li key={category.data.title} className="text-sm pt-2 pl-4">
                    <a href={`/tech/${slugify(category.data.title)}`}>
                        - {category.data.title} ({categoryPostCounts[category.id]})
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
        <div className="sticky top-[17rem] left-[4rem]">
            <div
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="p-4 space-y-2">
                    <h2 className=" font-semibold mb-2">
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
            </div>
        </div>
    )
        ;
};

export default Categories;

import React from 'react';
import ArticleHeader from './ArticleHeader';
import ArticleFooter from './ArticleFooter';

interface ArticleProps {
    title: string;
    date: Date;
    readTime: string;
    tags: string[];
    previousLink: {
        href: string;
        text: string;
    };
    nextLink: {
        href: string;
        text: string;
    };
}

const Article: React.FC<ArticleProps> = ({ title, date, readTime, tags, previousLink, nextLink }) => {
    return (
        <article className="col-span-6 col-start-3">
            <ArticleHeader title={title} date={date} readTime={readTime} tags={tags} />
            <div>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore alias placeat vitae in obcaecati veniam esse velit aliquam molestias perferendis quos et, odit illo quisquam! Totam explicabo dolorum est delectus.
            </div>
            <ArticleFooter previousLink={previousLink} nextLink={nextLink} />
        </article>
    );
};

export default Article;

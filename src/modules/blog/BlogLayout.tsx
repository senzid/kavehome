import React from 'react'
import Carousel from '@/components/ui/Carousel'
import { BlogCover } from './types';
import BlogCard from './BlogCard';

type BlogLayoutProps = {
  blogPosts: BlogCover[]
}

const BlogLayout = ({ blogPosts }: BlogLayoutProps) => {
  return (
    <section aria-label="Blog" className="flex w-full flex-col gap-6 pb-18">
      <Carousel
        scrollArrow={false}
        listClassName="pb-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0"
      >
        {blogPosts.map((blogPost) => (
          <li
            key={blogPost.id}
            className="w-screen shrink-0 snap-start md:w-full"
          >
            <BlogCard blogPost={blogPost} />
          </li>
        ))}
      </Carousel>
    </section>
  )
}

export default BlogLayout
/*!
 * generate-feed.ts v1.0.0
 *
 * https://github.com/equk/
 *
 * Copyright (c) 2023 B.Walden. All rights reserved.
 *
 * Licensed under the MIT License
 *
 * (LICENSE file should be included with script)
 */
import type { FeedOptions, Item } from "feed";
import { Feed } from "feed";
import markdownit from "markdown-it";
import sanitizeHtml from "sanitize-html";
import { getCollection } from "astro:content";
import { siteConfig } from "src/config";
import type { APIRoute } from "astro";

const year = +new Date().getFullYear();

const markdown = markdownit("commonmark");

/*
 * Main Feed Options
 */

const feed = new Feed({
  title: siteConfig.title,
  description: siteConfig.description,
  id: siteConfig.url + "/",
  link: siteConfig.url + "/",
  language: "en",
  author: {
    name: siteConfig.author.name,
  },
  copyright: `${year}, ranidspace`,
  favicon: siteConfig.url + "/favicon.svg",
  feedLinks: {
    atom: siteConfig.url + "/feed.atom",
  },
});

/*
 * Build Feed From Posts
 */

export const GET: APIRoute = async ({ site }) => {
  // Find markdown files in blog
  const collection = await getCollection("blog");
  // Map over array of blog post files
  const posts: any[] = await Promise.all(
    collection.map(async (post) => {
      // Generate excerpt from content
      const excerpt = sanitizeHtml(
        markdown
          .render(post.body)
          .replaceAll('src="/', `src="${siteConfig.url}/`)
          .replaceAll('href="/', `href="${siteConfig.url}/`),
        { allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]) }
      );
      const date = new Date(Date.parse(post.data.date));
      // Return data + add extra fields
      return {
        title: post.data.title,
        published: date,
        date: post.data.updated
          ? new Date(Date.parse(post.data.updated))
          : date,
        id: siteConfig.url + "/blog/" + post.id,
        link: siteConfig.url + "/blog/" + post.id,
        description: "",
        content: excerpt,
      };
    })
  );
  // Sort posts
  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  // Add post items
  posts.forEach((item: Item) => feed.addItem(item));
  // Write output file
  return new Response(feed.atom1());
  // Show cli stats
};

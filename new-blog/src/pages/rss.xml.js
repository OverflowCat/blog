import rss from '@astrojs/rss';
import { SITE_TITLE, SITE_DESCRIPTION } from '../config';
const postImportResult = import.meta.glob('../**.md');
const posts = Object.values(postImportResult);
import sanitizeHtml from 'sanitize-html';

export const get = () => {
	console.log(posts);
	return rss({
		title: '新世界的大门',
		description: 'A humble Astronaut’s guide to the stars',
		site: import.meta.env.SITE,
		items: posts.map((post) => {
			return {
				link: post.link,
				title: post.frontmatter.title,
				date: post.frontmatter.date,
				content: sanitizeHtml(post.compiledContent())
			}
		})
	});
}
// Markdown
import markdownIt from 'markdown-it';
import { footnote } from '@mdit/plugin-footnote';

const markdown_options = {
	html: true,
	linkify: true,
	typographer: true,
	breaks: false
};
const md = markdownIt(markdown_options)
            .use(footnote);

export default function(){
  return {
    tags: ['essays'],
    layout: 'essay.html',
    body_class: 'essay',
    eleventyComputed: {
      permalink: data => `/${data.page.fileSlug}/`,
      excerpt: (data) => {
        let excerpt = '';
        if ('excerpt' in data.page) {
          excerpt = md.renderInline(data.page.excerpt)
            .replace(/\[\^\d+\]/gi, '') // remove footnotes
            .replace(/(<([^>]+)>)/gi, '') // remove HTML
            .trim();
        }
        else if (data.description) {
          excerpt = md.renderInline(data.description)
            .replace(/\[\^\d+\]/gi, '') // remove footnotes
            .replace(/(<([^>]+)>)/gi, '') // remove HTML
            .trim();
        }
        return excerpt;
      },
    },
  };
}
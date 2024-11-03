import markdownIt from 'markdown-it';
import esbuild from './_source/_utilities/esbuild.js';
import lightingcss from './_source/_utilities/lightningcss.js';
import image from './_source/_utilities/image.js';
import style from './_source/_utilities/style.js';
import setVar from './_source/_utilities/setVar.js';
import fullDate from './_source/_utilities/fullDate.js';
import getRandom from './_source/_utilities/getRandom.js';
import markdownify from './_source/_utilities/markdownify.js';
import { IdAttributePlugin } from '@11ty/eleventy';
import { footnote } from '@mdit/plugin-footnote';

export default async function (eleventyConfig) {
  /* --------------------------------------------------------------------------
  Plugins, bundles, shortcodes, filters
  -------------------------------------------------------------------------- */
  eleventyConfig.addPlugin(esbuild);
  eleventyConfig.addPlugin(lightingcss);
  eleventyConfig.addPlugin(IdAttributePlugin);
  eleventyConfig.addBundle('css', { transforms: [style] });
  eleventyConfig.addShortcode('image', image);
  eleventyConfig.addPairedShortcode('setVar', setVar);
  eleventyConfig.addFilter('fullDate', fullDate);
  eleventyConfig.addFilter('getRandom', getRandom);
  eleventyConfig.addFilter('markdownify', markdownify);
  eleventyConfig.addFilter('toAuthorList', function( authors ) {
      if (! authors) return;
      let str;
      if ( authors.length > 2 ) {
        let last = authors.pop();
        str = authors.join(', ') + ', and ' + last;
      } else if ( authors.length == 2 ) {
        str = authors.join(' and ');
      } else {
        str = authors.join('');
      }
      return str;
  });

  /* --------------------------------------------------------------------------
  MarkdownIt settings
  -------------------------------------------------------------------------- */
  const markdownItOptions = {
    html: true,
    typographer: true,
  };
  eleventyConfig.setLibrary('md', markdownIt(markdownItOptions).use(footnote));

  /* --------------------------------------------------------------------------
  Layout aliases
  -------------------------------------------------------------------------- */
  eleventyConfig.addLayoutAlias('essay', 'essay.html');

  /* --------------------------------------------------------------------------
  Collections
  -------------------------------------------------------------------------- */
  eleventyConfig.addCollection('essays', collectionApi => {
		return collectionApi
						 .getFilteredByGlob(['**/essays/*.md'])
						 .reverse();
	});
  
  /* --------------------------------------------------------------------------
  Front Matter
  -------------------------------------------------------------------------- */
  eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		excerpt_separator: '<!-- more -->'
	});

  /* --------------------------------------------------------------------------
  Files & folders
  -------------------------------------------------------------------------- */
  eleventyConfig.ignores.add('.DS_Store');
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');
  eleventyConfig.addPassthroughCopy('_source/assets/fonts');
  eleventyConfig.addPassthroughCopy('_source/assets/images');

  return {
    dir: {
      input: '_source',
      output: '_public',
      layouts: '_layouts',
      includes: '_includes',
    },
    templateFormats: ['njk', 'html', 'md', 'liquid'],
    htmlTemplateEngine: 'liquid',
  };
}

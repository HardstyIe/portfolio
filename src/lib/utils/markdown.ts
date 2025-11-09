// src/lib/utils/markdown.ts
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configuration de marked
marked.setOptions({
	breaks: true, // Convertit les sauts de ligne en <br>
	gfm: true // GitHub Flavored Markdown
});

/**
 * Rend le markdown de manière sécurisée
 */
export function renderMarkdown(content: string): string {
	const html = marked(content) as string;
	return DOMPurify.sanitize(html, {
		ALLOWED_TAGS: [
			'p',
			'br',
			'strong',
			'em',
			'u',
			'code',
			'pre',
			'a',
			'ul',
			'ol',
			'li',
			'h1',
			'h2',
			'h3',
			'blockquote'
		],
		ALLOWED_ATTR: ['href', 'target', 'rel']
	});
}

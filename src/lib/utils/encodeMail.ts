const textToHexEntities = (text: string): string =>
	text
		.split('')
		.map((char) => `&#x${char.charCodeAt(0).toString(16)};`)
		.join('');

export { textToHexEntities };

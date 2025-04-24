interface IPost {
	frontmatter: {
		layout: string;
		title: string;
		pubDate: string; // It's a string in frontmatter, but should be parsed as Date
		description?: string;
		tags?: string[];
	};
	file: string;
}

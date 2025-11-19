/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro interop */
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: Astro interop */
/** biome-ignore-all lint/correctness/useUniqueElementIds: article.css */
import { Tag } from "@carbon/react";
import { Calendar, Folder, Tag as TagIcon } from "@carbon/icons-react";
import "./CarbonCommon.scss";

interface CarbonCommonProps {
	frontmatter: {
		title?: string;
		date: Date | string;
		categories?: string | string[];
		tags?: string | string[];
		hide_title?: boolean;
		photo?: {
			src?: string;
			alt?: string;
			caption?: string;
			hide?: boolean;
		};
	};
	children: React.ReactNode;
	postId?: string;
	catsInfo?: Map<string, number>;
	tagsInfo?: Map<string, number>;
}

function arrify<T>(x: T | T[] | undefined): T[] {
	if (!x) return [];
	return Array.isArray(x) ? x : [x];
}

export default function CarbonCommon({
	frontmatter,
	children,
	postId,
	catsInfo = new Map(),
	tagsInfo = new Map(),
}: CarbonCommonProps) {
	const cats = arrify(frontmatter.categories);
	const tags = arrify(frontmatter.tags);
	const cover = frontmatter.photo?.hide ? undefined : frontmatter.photo;

	const getCatSlug = (cat: string) => cat.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className="carbon-common-container">
			{cover && (
				<figure className="cover">
					<img
						id="cover"
						src={cover.src}
						alt={cover.alt || ""}
						className="cover-image"
					/>
					{cover.caption && (
						<figcaption dangerouslySetInnerHTML={{ __html: cover.caption }} />
					)}
				</figure>
			)}

			{!frontmatter.hide_title && frontmatter.title && (
				<h1 className="post-title" data-transition-name={postId}>
					{frontmatter.title}
				</h1>
			)}

			<div className="info-section">
				<div className="info-item">
					<Calendar size={20} className="info-icon" />
					<span>日期：</span>
					<time dateTime={frontmatter.date as string}>
						{new Date(frontmatter.date).toLocaleDateString("zh")}
					</time>
				</div>

				{cats.length > 0 && (
					<div className="info-item">
						<Folder size={20} className="info-icon" />
						<span>分类：</span>
						<div className="tags-container">
							{cats.map((cat) => (
								<Tag key={cat} type="blue" size="sm" renderIcon={Folder}>
									<a
										href={`/categories/${getCatSlug(cat)}/`}
										className="tag-link"
									>
										{cat}
										{catsInfo.has(cat) && <sup>{catsInfo.get(cat)}</sup>}
									</a>
								</Tag>
							))}
						</div>
					</div>
				)}

				{tags.length > 0 && (
					<div className="info-item">
						<TagIcon size={20} className="info-icon" />
						<span>标签：</span>
						<div className="tags-container">
							{tags.map((tag) => (
								<Tag key={tag} type="purple" size="sm" renderIcon={TagIcon}>
									<a href={`/tags/${tag}/`} className="tag-link">
										{tag}
										{tagsInfo.has(tag) && <sup>{tagsInfo.get(tag)}</sup>}
									</a>
								</Tag>
							))}
						</div>
					</div>
				)}
			</div>

			<article id="post" className="post-content">
				{children}
			</article>
		</div>
	);
}

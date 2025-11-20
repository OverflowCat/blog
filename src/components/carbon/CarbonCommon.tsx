/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro interop */
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: Astro interop */
/** biome-ignore-all lint/correctness/useUniqueElementIds: article.css */
import { Tag, Grid, Column, Stack } from "@carbon/react";
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
}

function arrify<T>(x: T | T[] | undefined): T[] {
	if (!x) return [];
	return Array.isArray(x) ? x : [x];
}

export default function CarbonCommon({
	frontmatter,
	children,
	postId,
}: CarbonCommonProps) {
	const cats = arrify(frontmatter.categories);
	const tags = arrify(frontmatter.tags);
	const cover = frontmatter.photo?.hide ? undefined : frontmatter.photo;

	const getCatSlug = (cat: string) => cat.toLowerCase().replace(/\s+/g, "-");

	return (
		<Grid fullWidth narrow>
			<Column lg={16} md={8} sm={4}>
				<Stack gap={6}>
					{cover && (
						<figure style={{ margin: 0 }}>
							<img
								id="cover"
								src={cover.src}
								alt={cover.alt || ""}
								style={{ width: "100%", height: "auto", display: "block" }}
							/>
							{cover.caption && (
								<figcaption
									style={{
										marginTop: "0.5rem",
										color: "var(--cds-text-secondary)",
										fontSize: "0.875rem",
										textAlign: "center",
									}}
									dangerouslySetInnerHTML={{ __html: cover.caption }}
								/>
							)}
						</figure>
					)}

					{!frontmatter.hide_title && frontmatter.title && (
						<h1 data-transition-name={postId} style={{ marginBottom: 0 }}>
							{frontmatter.title}
						</h1>
					)}

					<Stack gap={4} className="info-section">
						<div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
							<Calendar size={16} />
							<span style={{ fontSize: "0.875rem" }}>日期：</span>
							<time
								dateTime={frontmatter.date as string}
								style={{ fontSize: "0.875rem" }}
							>
								{new Date(frontmatter.date).toLocaleDateString("zh")}
							</time>
						</div>

						{cats.length > 0 && (
							<div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
								<Folder size={16} />
								<span style={{ fontSize: "0.875rem" }}>分类：</span>
								{cats.map((cat) => (
									<a key={cat} href={`/categories/${getCatSlug(cat)}/`} style={{ textDecoration: "none" }}>
										<Tag type="blue" size="sm">
											{cat}
										</Tag>
									</a>
								))}
							</div>
						)}

						{tags.length > 0 && (
							<div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
								<TagIcon size={16} />
								<span style={{ fontSize: "0.875rem" }}>标签：</span>
								{tags.map((tag) => (
									<a key={tag} href={`/tags/${tag}/`} style={{ textDecoration: "none" }}>
										<Tag type="purple" size="sm">
											{tag}
										</Tag>
									</a>
								))}
							</div>
						)}
					</Stack>

					<article id="post" className="post-content">
						{children}
					</article>
				</Stack>
			</Column>
		</Grid>
	);
}

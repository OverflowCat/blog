/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
import { Content, Theme } from "@carbon/react";
import type { Frontmatter } from "@/types";
import type { TocNode } from "@/components/98/98.ts";
import CarbonBar from "@/components/carbon/CarbonBar.tsx";
import CarbonPaper from "@/components/carbon/CarbonPaper.tsx";
import CarbonCommon from "@/components/carbon/CarbonCommon.tsx";
import CarbonToc from "@/components/carbon/CarbonToc.tsx";
import "./Carbon.scss";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-400-italic.css";

interface CarbonLayoutProps {
	frontmatter?: Frontmatter;
	content?: Frontmatter;
	file?: string;
	url?: string;
	children: React.ReactNode;
	index?: number;
	slogan?: string;
	showCommon?: boolean;
	tocTree?: TocNode | null;
}

export default function CarbonLayout({
	frontmatter,
	file,
	url,
	children,
	index,
	slogan,
	showCommon = true,
	catsInfo,
	tagsInfo,
	tocTree,
}: CarbonLayoutProps) {
	const theme = frontmatter?.theme ?? "white";
	const classes = frontmatter?.resizable !== false ? ["resizable"] : [];
	const postId = url?.replace(/^\//, "").replace(/\/$/, "") || file;
	const hasToc = tocTree?.children && tocTree.children.length > 0;

	return (
		<Theme theme={theme === true || theme === "auto" ? "g100" : "white"}>
			<CarbonBar
				index={index}
				theme={theme as "transparent" | "auto" | undefined}
				lang="zh-Hans"
				slogan={slogan}
			/>
			<Content className="carbon-layout-content" style={{
				marginInlineStart: 0,
			}}>
				{hasToc ? (
					<div className="carbon-layout-with-toc">
						<div className="carbon-main-content">
							<CarbonPaper
								transitionName="main"
								padding={true}
								paper={frontmatter?.paper ?? true}
								classes={classes}
							>
								{showCommon && frontmatter && url !== "/about" ? (
									<CarbonCommon
										frontmatter={frontmatter}
										postId={postId}
										lang={frontmatter.lang ?? "cmn"}
									>
										{children}
									</CarbonCommon>
								) : (
									children
								)}
							</CarbonPaper>
						</div>
						<div className="carbon-toc-sidebar">
							<CarbonToc tocTree={tocTree} />
						</div>
					</div>
				) : (
					<CarbonPaper
						transitionName="main"
						padding={true}
						paper={frontmatter?.paper ?? true}
						classes={classes}
					>
						{showCommon && frontmatter && url !== "/about" ? (
								<CarbonCommon
									frontmatter={frontmatter}
									postId={postId}
									lang={frontmatter.lang ?? "cmn"}
							>
								{children}
							</CarbonCommon>
						) : (
							children
						)}
					</CarbonPaper>
				)}
			</Content>
		</Theme>
	);
}

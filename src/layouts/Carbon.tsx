/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
import { Content, Theme } from "@carbon/react";
import type { Frontmatter } from "@/types";
import CarbonBar from "@/components/carbon/CarbonBar.tsx";
import CarbonPaper from "@/components/carbon/CarbonPaper.tsx";
import CarbonCommon from "@/components/carbon/CarbonCommon.tsx";
import "./Carbon.scss";

interface CarbonLayoutProps {
	frontmatter?: Frontmatter;
	content?: Frontmatter;
	file?: string;
	url?: string;
	children: React.ReactNode;
	index?: number;
	slogan?: string;
	showCommon?: boolean;
	catsInfo?: Map<string, number>;
	tagsInfo?: Map<string, number>;
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
}: CarbonLayoutProps) {
	const theme = frontmatter?.theme ?? "white";
	const classes = frontmatter?.resizable !== false ? ["resizable"] : [];
	const postId = url?.replace(/^\//, "").replace(/\/$/, "") || file;

	return (
		<Theme theme={theme === true || theme === "auto" ? "g100" : "white"}>
			<CarbonBar
				index={index}
				theme={theme as "transparent" | "auto" | undefined}
				lang="zh-Hans"
				slogan={slogan}
			/>
			<Content className="carbon-layout-content">
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
							catsInfo={catsInfo}
							tagsInfo={tagsInfo}
						>
							{children}
						</CarbonCommon>
					) : (
						children
					)}
				</CarbonPaper>
			</Content>
		</Theme>
	);
}

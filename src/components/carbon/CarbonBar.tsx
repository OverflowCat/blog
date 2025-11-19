/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
import {
	Header,
	HeaderName,
	HeaderNavigation,
	HeaderMenuItem,
	HeaderGlobalBar,
	HeaderGlobalAction,
} from "@carbon/react";
import { UserAvatar, Asleep, Catalog, Rss } from "@carbon/icons-react";
import "./CarbonBar.scss";

interface CarbonBarProps {
	index?: number;
	theme?: "transparent" | "auto";
	lang?: "zh-Hans" | "zh-Hant" | "en";
	logo?: boolean;
	mode?: {
		theme?: boolean | "auto";
		hant?: boolean;
		vert?: boolean;
	};
	slogan?: string;
}

export default function CarbonBar({
	index,
	theme = "auto",
	lang = "zh-Hans",
	logo = true,
	slogan = "溢出的猫",
}: CarbonBarProps) {
	const items = [
		["文章", "Home", "/"],
		["归档", "Archives", "/archives"],
		["友链", "Friends", "/friends"],
		["订阅", "RSS", "/atom.xml"],
		["关于", "About", "/about"],
	];

	return (
		<>
			{logo && (
				<div className="carbon-header-logo-section">
					<div className="logo-container">
						<img src="/门-v2z2.svg" alt="logo" className="main-logo" />
					</div>
					<div className="slogan" data-text={slogan}>
						{slogan}
					</div>
				</div>
			)}
			<Header aria-label="Blog Navigation" className="carbon-bar-header">
				<HeaderName href="/" prefix="">
					<img src="/门-v2z2.svg" alt="logo" className="header-logo-small" />
				</HeaderName>
				<HeaderNavigation aria-label="Main Navigation">
					{items.map((item, i) => (
						<HeaderMenuItem
							key={i}
							href={item[2]}
							isCurrentPage={index === i}
						>
							{item[0]}
						</HeaderMenuItem>
					))}
				</HeaderNavigation>
				<HeaderGlobalBar>
					<HeaderGlobalAction
						aria-label="User settings"
						tooltipAlignment="end"
					>
						<UserAvatar size={20} />
					</HeaderGlobalAction>
				</HeaderGlobalBar>
			</Header>
		</>
	);
}

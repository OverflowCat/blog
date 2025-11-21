/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
import { useState } from "react";
import {
	Header,
	HeaderGlobalBar,
	HeaderMenuItem,
	HeaderName,
	HeaderNavigation,
	HeaderMenuButton,
	SideNav,
	SideNavItems,
	SideNavLink,
} from "@carbon/react";
import { Home, Archive, UserMultiple, Rss, Information } from "@carbon/icons-react";
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
	const [isSideNavExpanded, setIsSideNavExpanded] = useState(false);
	
	const items = [
		["文章", "Home", "/", Home],
		["归档", "Archives", "/archives", Archive],
		["友链", "Friends", "/friends", UserMultiple],
		["订阅", "RSS", "/atom.xml", Rss],
		["关于", "About", "/about", Information],
	];

	return (
		<>
			{logo && (
				<div className="carbon-header-logo-section">
					<div className="logo-container">
						{/* <img src="/门-v2z2.svg" alt="logo" className="main-logo" /> */}
					</div>
					<div className="slogan" data-text={slogan}>
						{slogan}
					</div>
				</div>
			)}
			<Header aria-label="Blog Navigation" className="carbon-bar-header">
				<HeaderMenuButton
					aria-label="Open menu"
					onClick={() => setIsSideNavExpanded(!isSideNavExpanded)}
					isActive={isSideNavExpanded}
				/>
				<HeaderName href="/" prefix="">
					<img src="/门-v2z2.svg" alt="logo" className="header-logo-small" />
				</HeaderName>
				<HeaderNavigation aria-label="Main Navigation">
					{items.map((item, i) => {
						const Icon = item[3];
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: determined at build time
							<HeaderMenuItem key={i} href={item[2]} isCurrentPage={index === i}>
								<Icon size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
								{item[0]}
							</HeaderMenuItem>
						);
					})}
				</HeaderNavigation>
				<HeaderGlobalBar>
				</HeaderGlobalBar>
			</Header>
			<SideNav
				aria-label="Side navigation"
				expanded={isSideNavExpanded}
				isPersistent={false}
				onOverlayClick={() => setIsSideNavExpanded(false)}
			>
				<SideNavItems>
					{items.map((item, i) => {
						const Icon = item[3];
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: determined at build time
							<SideNavLink key={i} href={item[2]} isActive={index === i} renderIcon={Icon}>
								{item[0]}
							</SideNavLink>
						);
					})}
				</SideNavItems>
			</SideNav>
		</>
	);
}

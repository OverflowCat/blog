/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
import { Tile } from "@carbon/react";
import "./CarbonPaper.scss";

interface CarbonPaperProps {
	padding?: boolean;
	paper?: boolean;
	classes?: string[];
	children: React.ReactNode;
	transitionName?: string;
	[key: string]: any;
}

export default function CarbonPaper({
	padding = false,
	paper = true,
	classes = [],
	children,
	transitionName,
	...rest
}: CarbonPaperProps) {
	const classNames = ["carbon-paper", ...classes];
	
	if (padding) {
		classNames.push("padding");
	}
	
	if (paper !== false) {
		classNames.push("vpaper");
	}

	return (
		<Tile
			className={classNames.join(" ")}
			data-transition-name={transitionName}
			{...rest}
		>
			{children}
		</Tile>
	);
}

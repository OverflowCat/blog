/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
import { TreeView, TreeNode, Button } from "@carbon/react";
import { Document } from "@carbon/icons-react";
import { useState } from "react";
import type { TocNode } from "@/components/98/98.ts";
import "./CarbonToc.scss";

interface CarbonTocProps {
	tocTree: TocNode;
}

export default function CarbonToc({ tocTree }: CarbonTocProps) {
	const [expanded, setExpanded] = useState<boolean | undefined>(undefined);

	function renderTree(nodes: TocNode[], expandedState?: boolean): React.ReactNode {
		if (!nodes || nodes.length === 0) {
			return null;
		}

		return nodes.map((node) => (
			<TreeNode
				key={node.slug}
				id={node.slug}
				value={node.slug}
				label={
					<a 
						href={`#${node.slug}`} 
						className="toc-link"
						onClick={(e) => {
							e.preventDefault();
							const target = document.getElementById(node.slug);
							if (target) {
								target.scrollIntoView({ behavior: "smooth", block: "start" });
								window.location.hash = node.slug;
							}
						}}
					>
						{node.text}
					</a>
				}
				renderIcon={Document}
				isExpanded={expandedState ?? (node.depth <= 2)}
			>
				{node.children && node.children.length > 0
					? renderTree(node.children, expandedState)
					: null}
			</TreeNode>
		));
	}

	return (
		<div className="carbon-toc">
			<div className="toc-controls">
				<Button
					size="sm"
					kind="ghost"
					onClick={() => setExpanded(true)}
				>
					展开全部
				</Button>
				<Button
					size="sm"
					kind="ghost"
					onClick={() => setExpanded(false)}
				>
					折叠全部
				</Button>
			</div>
			<TreeView label="目录" hideLabel>
				{tocTree.children ? renderTree(tocTree.children, expanded) : null}
			</TreeView>
		</div>
	);
}

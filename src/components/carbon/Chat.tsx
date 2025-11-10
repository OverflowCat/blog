/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
/** biome-ignore-all lint/suspicious/noImplicitAnyLet: Regex */
/** biome-ignore-all lint/suspicious/noAssignInExpressions: Regex */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: Static */
/** biome-ignore-all assist/source/organizeImports: AIGC */

import { useMemo } from "react";
import {
	Tile,
	ExpandableTile,
	TileAboveTheFoldContent,
	TileBelowTheFoldContent,
	AILabel,
	AILabelContent,
	AILabelActions,
	AISkeletonText,
	Tag,
	Button,
	IconButton,
	DismissibleTag,
} from "@carbon/react";
import {
	User,
	Code,
	Edit,
	View,
	Search,
	DocumentBlank,
	FolderOpen,
	Folders,
	Checkmark,
} from "@carbon/icons-react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeReact from "rehype-react";
import * as jsxRuntime from "react/jsx-runtime";
import "./Chat.scss";

interface Message {
	id: string;
	type: "user" | "ai";
	author: string;
	digest?: string;
	content: string;
	hasCodeBlock?: boolean;
	toolUse?: {
		type: "read_file" | "replace_string" | "create_file" | "search";
		description: string;
	}[];
	confidence?: number;
}

const CHAT_LOG: Message[] = [
	{
		id: "1",
		type: "user",
		author: "OverflowCat",
		content:
			"@workspace - 给 PROJECT 写文档\n    - 现在 我有一个比较特殊的需求：客户需要一个比较传统的 software manual。\n    - 下面，请你在 status bar 的末端加一个揿钮，打开一个全屏的manual介面。其中复用现有的组件来介绍功能。",
	},
	{
		id: "2",
		type: "ai",
		author: "Workspace",
		content: "Collecting workspace information",
		toolUse: [
			{ type: "search", description: "Collecting workspace information" },
		],
	},
	{
		id: "3",
		type: "ai",
		author: "Workspace",
		digest:
			"我会帮你在状态栏末端添加一个按钮，打开全屏的软件手册界面。让我创建相关的组件和修改：",
		content:
			"首先，创建手册组件：\n\nCODEBLOCK\n\n然后修改状态栏，添加手册按钮：\n\nCODEBLOCK\n\n最后添加一些样式优化：\n\nCODEBLOCK\n\n这个方案提供了：\n\n1. **完整的使用手册界面**：使用 Carbon Design System 的 Modal 和 Tabs 组件\n2. **四个主要章节**：\n   - 概述：软件介绍、功能、系统要求\n   - 主界面：详细介绍各个界面区域\n   - 标定模式：说明两种模式和偏差计算\n   - 操作流程：分步骤的操作指南和故障排除\n\n3. **复用现有组件**：\n   - `CalibrationModeSelector` 用于演示标定模式\n   - `DataDisplay` 用于展示数据布局\n   - 状态栏元素用于说明底部信息栏\n\n4. **状态栏按钮**：在 `StatusBar` 末端添加使用手册按钮，点击打开全屏手册\n\n5. **友好的排版**：清晰的标题层级、充足的间距、合理的配色\n\n这样客户可以随时打开手册查看软件的详细使用说明！",
		hasCodeBlock: true,
	},
	{
		id: "4",
		type: "user",
		author: "OverflowCat",
		content:
			"你这边不对——\n\n1. please 说明 开始/停止 和其他按钮的 disabled 的状态变化\n2. 缺少打开原厂软件的按钮介绍（虽然目前还没实现）",
	},
	{
		id: "5",
		type: "ai",
		author: "GitHub Copilot",
		digest: "我来修正这两个问题：",
		content:
			'Using "Replace String in File"\n\n\nCODEBLOCK\n现在修改了手册中控制栏的说明，包括：\n\n1. **详细说明了按钮的 disabled 状态变化**：\n   - 串口输入框：监测停止时可编辑，运行时禁用\n   - 开始/停止按钮：始终可用，会根据状态切换文字和颜色\n   - 切换原厂软件：仅在停止时可用\n   - 退出按钮：仅在停止时可用，运行时禁用\n\n2. **添加了按钮的介绍**：\n   - 说明其功能是启动设备原厂配套软件\n   - 解释点击后会隐藏当前窗口\n   - 说明原厂软件关闭后会自动返回\n\n3. **在演示区域也添加了该按钮**，使用 `Settings` 图标来展示\n\n这样用户就能清楚地了解每个控件在不同状态下的行为了！\n\nMade changes.',
		toolUse: [
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "6",
		type: "user",
		author: "OverflowCat",
		content:
			"這個縮放會讓 Manual 的 Modal 佈局錯誤（超出屏幕），但是我又不能 刪掉這個",
	},
	{
		id: "7",
		type: "ai",
		author: "GitHub Copilot",
		digest:
			"我理解了，全局的 `zoom: 1.2` 会影响 Modal 的布局。我们可以在 Manual 的 Modal 上重置 zoom。让我修改 CSS：",
		content:
			'Using "Replace String in File"\n\n\nCODEBLOCK\n让我查看一下 App.css 文件的完整内容： \n\nRead [](file:///c%3A/.../PROJECT/src/App.css#130-130), lines 130 to 170\n\n我看到问题了，有一个 `// ...existing code...` 的注释造成了错误。让我修复它： \n\nUsing "Replace String in File"\n\nMade changes.',
		toolUse: [
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
			{
				type: "read_file",
				description:
					"Read [](file:///c%3A/.../PROJECT/src/App.css#130-130), lines 130 to 170",
			},
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "8",
		type: "user",
		author: "OverflowCat",
		content: "请改成符合颜色的，不要禁用的",
	},
	{
		id: "9",
		type: "ai",
		author: "GitHub Copilot",
		digest:
			"我来修改 Manual 中的演示按钮，让它们显示正确的颜色状态而不是都禁用：",
		content:
			'Using "Replace String in File"\n\n\nCODEBLOCK\n完成！我已经将演示按钮从 `disabled` 改为使用 `pointerEvents: "none"`，这样：\n\n1. ✅ **"开始监测"** 按钮显示为蓝色主按钮（`kind="primary"`）\n2. ✅ **"停止监测"** 按钮显示为红色危险按钮（`kind="danger"`）\n3. ✅ **"切换原厂软件"** 按钮显示为灰色第三级按钮（`kind="tertiary"`）\n4. ✅ **"退出"** 按钮显示为红色第三级按钮（`kind="danger--tertiary"`）\n\n所有按钮都保持了正确的颜色，但通过 `pointerEvents: "none"` 阻止点击，这样在手册中就能看到它们正常的视觉效果了！\n\nMade changes.',
		toolUse: [
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "10",
		type: "user",
		author: "OverflowCat",
		content: "改成 html 列表的，你这是 markdown",
	},
	{
		id: "11",
		type: "ai",
		author: "GitHub Copilot",
		digest: "我来把 Markdown 格式的列表改成 HTML 列表：",
		content:
			'Using "Replace String in File"\n\n\nCODEBLOCK\n完成！我已经将 Markdown 风格的列表（使用 `•` 和 `-` 以及 `<br />` 和 `&nbsp;`）改成了正确的 HTML 嵌套列表结构：\n\n- 使用 `<ul>` 和 `<li>` 标签\n- 主要项目作为一级列表\n- 详细说明作为嵌套的二级列表\n- 添加了适当的间距样式\n\n这样语义更清晰，样式也更容易控制！\n\nMade changes.',
		toolUse: [
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "12",
		type: "user",
		author: "OverflowCat",
		content: "请把四个 tab 拆成4个 components文件",
	},
	{
		id: "13",
		type: "ai",
		author: "GitHub Copilot",
		digest: "我来把四个 Tab 拆分成独立的组件文件：",
		content:
			'Created [](file:///c%3A/.../PROJECT/src/components/manual/OverviewTab.tsx)\n\nCreated [](file:///c%3A/.../PROJECT/src/components/manual/InterfaceTab.tsx)\n\nCreated [](file:///c%3A/.../PROJECT/src/components/manual/CalibrationTab.tsx)\n\nCreated [](file:///c%3A/.../PROJECT/src/components/manual/WorkflowTab.tsx)\n\n现在更新 Manual.tsx 来使用这些新组件： \n\nUsing "Replace String in File"\n\n\nCODEBLOCK\n现在替换 TabPanels 的内容： \n\nUsing "Replace String in File"\n\n\nCODEBLOCK\n现在替换 TabPanels 的内容： \n\nMade changes.',
		toolUse: [
			{
				type: "create_file",
				description:
					"Created [](file:///c%3A/.../PROJECT/src/components/manual/OverviewTab.tsx)",
			},
			{
				type: "create_file",
				description:
					"Created [](file:///c%3A/.../PROJECT/src/components/manual/InterfaceTab.tsx)",
			},
			{
				type: "create_file",
				description:
					"Created [](file:///c%3A/.../PROJECT/src/components/manual/CalibrationTab.tsx)",
			},
			{
				type: "create_file",
				description:
					"Created [](file:///c%3A/.../PROJECT/src/components/manual/WorkflowTab.tsx)",
			},
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "14",
		type: "user",
		author: "OverflowCat",
		content: "@agent Try Again",
	},
	{
		id: "17",
		type: "ai",
		author: "GitHub Copilot",
		digest: "让我重新替换 Manual.tsx 中的 TabPanels 部分：",
		content: 'Using "Replace String in File"\n\n\nCODEBLOCK\n\n\nMade changes.',
		toolUse: [
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "18",
		type: "user",
		author: "OverflowCat",
		content: "@agent Try Again",
	},
	{
		id: "19",
		type: "ai",
		author: "GitHub Copilot",
		digest: "让我查看文件内容并进行修改：",
		content:
			'Read [](file:///c%3A/.../PROJECT/src/Manual.tsx#115-115), lines 115 to 250\n\nUsing "Replace String in File"\n\n\nCODEBLOCK\n让我查看文件中还剩下什么内容需要替换： \n\nRead [](file:///c%3A/.../PROJECT/src/Manual.tsx#125-125), lines 125 to 400\n\n我看到问题了，还有重复的内容。让我删除这些重复的部分： \n\nUsing "Replace String in File"\n\n\nCODEBLOCK\n完成！我已经成功将四个 Tab 拆分成独立的组件文件：\n\n1. **`OverviewTab.tsx`** - 概述标签，包含软件简介、主要功能和系统要求\n2. **`InterfaceTab.tsx`** - 主界面标签，展示控制栏、数据展示区和状态栏\n3. **`CalibrationTab.tsx`** - 标定模式标签，说明两种标定模式和偏差计算\n4. **`WorkflowTab.tsx`** - 操作流程标签，提供分步骤操作指南和故障排除\n\n现在 Manual.tsx 变得更加简洁，只负责组织这些Tab组件的结构，而每个Tab的具体内容都在独立的组件文件中，便于维护和复用！\n\nMade changes.',
		toolUse: [
			{
				type: "read_file",
				description:
					"Read [](file:///c%3A/.../PROJECT/src/Manual.tsx#115-115), lines 115 to 250",
			},
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
			{
				type: "read_file",
				description:
					"Read [](file:///c%3A/.../PROJECT/src/Manual.tsx#125-125), lines 125 to 400",
			},
			{
				type: "replace_string",
				description: 'Using "Replace String in File"',
			},
		],
		hasCodeBlock: true,
	},
];

export default function Chat() {
	const messages = CHAT_LOG;

	// Create markdown processor
	const markdownProcessor = useMemo(
		() =>
			unified()
				.use(remarkParse)
				.use(remarkRehype)
				.use(rehypeReact, {
					Fragment: jsxRuntime.Fragment,
					jsx: jsxRuntime.jsx,
					jsxs: jsxRuntime.jsxs,
				}),
		[],
	);

	// Convert markdown string to React elements
	const renderMarkdown = (markdown: string) => {
		try {
			const result = markdownProcessor.processSync(markdown);
			return result.result;
		} catch (error) {
			console.error("Error rendering markdown:", error);
			return markdown;
		}
	};

	const renderUserMessage = (message: Message) => {
		// Parse user message to extract @mentions
		const parseUserMessage = (content: string) => {
			const mentionRegex = /@(\w+)/g;
			const parts: Array<{ type: "text" | "mention"; content: string }> = [];
			let lastIndex = 0;
			let match;

			while ((match = mentionRegex.exec(content)) !== null) {
				// Add text before mention
				if (match.index > lastIndex) {
					parts.push({
						type: "text",
						content: content.substring(lastIndex, match.index),
					});
				}
				// Add mention
				parts.push({
					type: "mention",
					content: match[1],
				});
				lastIndex = match.index + match[0].length;
			}

			// Add remaining text
			if (lastIndex < content.length) {
				parts.push({
					type: "text",
					content: content.substring(lastIndex),
				});
			}

			return parts.length > 0 ? parts : [{ type: "text" as const, content }];
		};

		const messageParts = parseUserMessage(message.content);

		return (
			<div className="chat-message user-message" key={message.id}>
				<Tile className="message-tile user-tile" style={{ backgroundColor: "#ababab2b" }}>
					<div className="message-header">
						<Tag type="blue" renderIcon={User}>
							{message.author}
						</Tag>
					</div>
					<div className="message-content">
						{messageParts.map((part, idx) => {
							if (part.type === "mention") {
								return (
									<Tag
										key={idx}
										type="cool-gray"
										size="sm"
										style={{ marginRight: "0.25rem" }}
									>
										@{part.content}
									</Tag>
								);
							}
							return <span key={idx}>{part.content}</span>;
						})}
					</div>
				</Tile>
			</div>
		);
	};

	const renderAIMessage = (message: Message) => {
		const hasToolUse = message.toolUse && message.toolUse.length > 0;
		const hasCode = message.hasCodeBlock;

		const getToolIcon = (type: string) => {
			switch (type) {
				case "read_file":
					return DocumentBlank;
				case "replace_string":
					return Edit;
				case "create_file":
					return FolderOpen;
				case "search":
					return Search;
				default:
					return Code;
			}
		};

		const getToolColor = (type: string) => {
			switch (type) {
				case "read_file":
					return "blue";
				case "replace_string":
					return "magenta";
				case "create_file":
					return "green";
				case "search":
					return "cyan";
				default:
					return "purple";
			}
		};

		// Parse content to extract tool usage and code blocks
		const parseContent = (content: string) => {
			const items: Array<{
				type: "text" | "tool" | "code";
				content: string;
				toolType?: string;
			}> = [];
			const lines = content.split("\n");
			let currentText = "";

			for (const line of lines) {
				if (
					line.includes('Using "') ||
					line.includes("Created ") ||
					line.includes("Read ")
				) {
					if (currentText) {
						items.push({ type: "text", content: currentText.trim() });
						currentText = "";
					}

					let toolType = "unknown";
					if (line.includes("Replace String")) toolType = "replace_string";
					else if (line.includes("Created")) toolType = "create_file";
					else if (line.includes("Read")) toolType = "read_file";

					items.push({ type: "tool", content: line.trim(), toolType });
				} else if (line.includes("CODEBLOCK")) {
					if (currentText) {
						items.push({ type: "text", content: currentText.trim() });
						currentText = "";
					}
					items.push({ type: "code", content: "Code generated" });
				} else {
					currentText += line + "\n";
				}
			}

			if (currentText.trim()) {
				items.push({ type: "text", content: currentText.trim() });
			}

			return items;
		};

		const contentItems = parseContent(message.content);

		if (hasCode || hasToolUse) {
			return (
				<div className="chat-message ai-message" key={message.id}>
					<ExpandableTile
						className="message-tile ai-tile"
						decorator={
							<AILabel className="ai-label-container">
								<AILabelContent>
									<div>
										<p className="secondary">Model type</p>
										<p className="bold">GitHub Copilot</p>
									</div>
									<AILabelActions>
										<IconButton kind="ghost" label="View details">
											<View />
										</IconButton>
										<IconButton kind="ghost" label="Browse files">
											<Folders />
										</IconButton>
										<Button size="sm">View details</Button>
									</AILabelActions>
								</AILabelContent>
							</AILabel>
						}
						tileCollapsedIconText="Expand to see details"
						tileExpandedIconText="Collapse details"
					>
						<TileAboveTheFoldContent>
							<div className="message-header">
								<Tag type="purple" renderIcon={Code}>
									{message.author}
								</Tag>
							</div>
							<div className="message-content">
								{message.digest ? renderMarkdown(message.digest) : renderMarkdown(message.content)}
							</div>
						</TileAboveTheFoldContent>
						<TileBelowTheFoldContent>
							{message.digest && (
								<>
									<h6>Full Response</h6>
									<div className="message-content-parsed">
										{contentItems.map((item, idx) => {
											if (item.type === "text") {
												return (
													<div key={idx} className="message-content">
														{renderMarkdown(item.content)}
													</div>
												);
											} else if (item.type === "tool") {
												return (
													<DismissibleTag
														key={idx}
														type={getToolColor(item.toolType || "unknown")}
														renderIcon={getToolIcon(item.toolType || "unknown")}
														text={item.content}
														title="Tool usage"
														onClose={(e) => e.preventDefault()}
														style={{ marginBottom: "0.5rem" }}
													/>
												);
											} else if (item.type === "code") {
												return (
													<div key={idx} style={{ marginBottom: "1rem" }}>
														<h6>Generated Code</h6>
														<AISkeletonText />
													</div>
												);
											}
											return null;
										})}
									</div>
								</>
							)}
							{!message.digest && hasCode && (
								<>
									<h6>Generated Code</h6>
									<AISkeletonText />
								</>
							)}
							<div className="message-actions">
								<Button kind="ghost" size="sm" renderIcon={Checkmark}>
									Applied
								</Button>
							</div>
						</TileBelowTheFoldContent>
					</ExpandableTile>
				</div>
			);
		}

		return (
			<div className="chat-message ai-message" key={message.id}>
				<Tile className="message-tile ai-tile">
					<div className="message-header">
						<Tag type="purple" renderIcon={Code}>
							{message.author}
						</Tag>
					</div>
					<div className="message-content">{renderMarkdown(message.content)}</div>
					{message.confidence && (
						<div className="message-stats">
							<div className="stat-item">
								<p className="secondary">Confidence</p>
								<h4>{message.confidence}%</h4>
							</div>
						</div>
					)}
				</Tile>
			</div>
		);
	};

	return (
		<div className="chat-container">
			<div className="chat-header">
				<Tile className="chat-header-tile">
					<h4>GitHub Copilot Conversation Log</h4>
					<p>Development session: Manual documentation and UI refinements</p>
					<div className="header-stats">
						<div className="stat-item">
							<p>Messages</p>
							<h3>{messages.length}</h3>
						</div>
						<div className="stat-item">
							<p>AI Responses</p>
							<h3>{messages.filter((m) => m.type === "ai").length}</h3>
						</div>
					</div>
				</Tile>
			</div>

			<div className="chat-messages">
				{messages.map((message) =>
					message.type === "user"
						? renderUserMessage(message)
						: renderAIMessage(message),
				)}
			</div>
		</div>
	);
}

/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
/** biome-ignore-all assist/source/organizeImports: AIGC */
import {
	Tile,
	ExpandableTile,
	TileAboveTheFoldContent,
	TileBelowTheFoldContent,
	AILabel,
	AILabelContent,
	AILabelActions,
	AISkeletonIcon,
	AISkeletonPlaceholder,
	AISkeletonText,
	Tag,
	Button,
	IconButton,
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
import "./Chat.scss";

interface Message {
	id: string;
	type: "user" | "ai";
	author: string;
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
			"@workspace - 给 PROJECT 写文档\n- 现在 我有一个比较特殊的需求：客户需要一个比较传统的 software manual。\n- 下面，请你在 status bar 的末端加一个揿钮，打开一个全屏的manual介面。其中复用现有的组件来介绍功能。",
	},
	{
		id: "2",
		type: "ai",
		author: "GitHub Copilot",
		content:
			"我会帮你在状态栏末端添加一个按钮，打开全屏的软件手册界面。让我创建相关的组件和修改：",
		confidence: 92,
		toolUse: [
			{ type: "search", description: "Collecting workspace information" },
			{ type: "create_file", description: "Created Manual.tsx" },
			{ type: "replace_string", description: "Modified StatusBar.tsx" },
		],
		hasCodeBlock: true,
	},
	{
		id: "3",
		type: "user",
		author: "OverflowCat",
		content:
			"你这边不对——\n\n1. please 说明 开始/停止 和其他按钮的 disabled 的状态变化\n2. 缺少打开原厂软件的按钮介绍（虽然目前还没实现）",
	},
	{
		id: "4",
		type: "ai",
		author: "GitHub Copilot",
		content: "我来修正这两个问题：",
		confidence: 94,
		toolUse: [
			{
				type: "replace_string",
				description: "Updated control section descriptions",
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "5",
		type: "user",
		author: "OverflowCat",
		content:
			"這個縮放會讓 Manual 的 Modal 佈局錯誤（超出屏幕），但是我又不能 刪掉這個",
	},
	{
		id: "6",
		type: "ai",
		author: "GitHub Copilot",
		content:
			"我理解了，全局的 `zoom: 1.2` 会影响 Modal 的布局。我们可以在 Manual 的 Modal 上重置 zoom。让我修改 CSS：",
		confidence: 96,
		toolUse: [
			{
				type: "replace_string",
				description: "Modified App.css to reset zoom for Manual modal",
			},
			{ type: "read_file", description: "Read App.css, lines 130 to 170" },
		],
		hasCodeBlock: true,
	},
	{
		id: "7",
		type: "user",
		author: "OverflowCat",
		content: "请改成符合颜色的，不要禁用的",
	},
	{
		id: "8",
		type: "ai",
		author: "GitHub Copilot",
		content:
			"我来修改 Manual 中的演示按钮，让它们显示正确的颜色状态而不是都禁用：",
		confidence: 95,
		toolUse: [
			{
				type: "replace_string",
				description:
					'Changed button styles from disabled to pointerEvents: "none"',
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "9",
		type: "user",
		author: "OverflowCat",
		content: "改成 html 列表的，你这是 markdown",
	},
	{
		id: "10",
		type: "ai",
		author: "GitHub Copilot",
		content: "我来把 Markdown 格式的列表改成 HTML 列表：",
		confidence: 98,
		toolUse: [
			{
				type: "replace_string",
				description: "Converted Markdown lists to HTML <ul> and <li> tags",
			},
		],
		hasCodeBlock: true,
	},
	{
		id: "11",
		type: "user",
		author: "OverflowCat",
		content: "请把四个 tab 拆成4个 components文件",
	},
	{
		id: "12",
		type: "ai",
		author: "GitHub Copilot",
		content: "我来把四个 Tab 拆分成独立的组件文件：",
		confidence: 93,
		toolUse: [
			{ type: "create_file", description: "Created OverviewTab.tsx" },
			{ type: "create_file", description: "Created InterfaceTab.tsx" },
			{ type: "create_file", description: "Created CalibrationTab.tsx" },
			{ type: "create_file", description: "Created WorkflowTab.tsx" },
			{
				type: "replace_string",
				description: "Updated Manual.tsx to use new components",
			},
		],
		hasCodeBlock: true,
	},
];

export default function Chat() {
	const messages = CHAT_LOG;

	const renderUserMessage = (message: Message) => (
		<div className="chat-message user-message" key={message.id}>
			<Tile className="message-tile user-tile">
				<div className="message-header">
					<Tag type="blue" renderIcon={User}>
						{message.author}
					</Tag>
				</div>
				<p className="message-content">{message.content}</p>
			</Tile>
		</div>
	);

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

		if (hasCode || hasToolUse) {
			return (
				<div className="chat-message ai-message" key={message.id}>
					<ExpandableTile
						className="message-tile ai-tile"
						decorator={
							<AILabel className="ai-label-container">
								<AILabelContent>
									<div>
										<p className="secondary">AI Analysis</p>
										<h2 className="ai-label-heading">{message.confidence}%</h2>
										<p className="secondary bold">Confidence score</p>
										<p className="secondary">
											This response includes automated tool usage and code
											modifications to fulfill the user's request.
										</p>
										<hr />
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
							<p className="message-content">{message.content}</p>
							{message.confidence && (
								<div className="message-stats">
									<div className="stat-item">
										<p className="secondary">Confidence</p>
										<h4>{message.confidence}%</h4>
									</div>
									{hasToolUse && (
										<div className="stat-item">
											<p className="secondary">Tools Used</p>
											<h4>{message.toolUse?.length}</h4>
										</div>
									)}
								</div>
							)}
						</TileAboveTheFoldContent>
						<TileBelowTheFoldContent>
							{hasToolUse && (
								<>
									<h6>Tool Usage</h6>
									<div className="tool-use-list">
										{message.toolUse?.map((tool, idx) => (
											// biome-ignore lint/suspicious/noArrayIndexKey: static input
											<Tile key={idx} className="tool-use-item">
												<div className="tool-header">
													{(() => {
														const Icon = getToolIcon(tool.type);
														return <Icon size={20} />;
													})()}
													<Tag type="cyan" size="sm">
														{tool.type}
													</Tag>
												</div>
												<p className="tool-description">{tool.description}</p>
											</Tile>
										))}
									</div>
								</>
							)}
							{hasCode && (
								<>
									<h6>Generated Code</h6>
									<div style={{ margin: "1rem 0" }}>
										<AISkeletonPlaceholder className="code-skeleton" />
									</div>
									<div
										className="skeleton-icons"
										style={{ display: "flex", gap: "1rem", margin: "1rem 0" }}
									>
										<AISkeletonIcon style={{ width: "24px", height: "24px" }} />
										<AISkeletonIcon style={{ width: "24px", height: "24px" }} />
										<AISkeletonIcon style={{ width: "24px", height: "24px" }} />
									</div>
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
				<Tile
					className="message-tile ai-tile"
					decorator={
						message.confidence && message.confidence > 90 ? (
							<AILabel className="ai-label-container">
								<AILabelContent>
									<div>
										<p className="secondary">AI Response</p>
										<h2 className="ai-label-heading">{message.confidence}%</h2>
										<p className="secondary bold">Confidence score</p>
										<p className="secondary">
											High confidence response based on code analysis.
										</p>
										<hr />
										<p className="secondary">Model type</p>
										<p className="bold">GitHub Copilot</p>
									</div>
									<AILabelActions>
										<IconButton kind="ghost" label="View">
											<View />
										</IconButton>
										<Button size="sm">View details</Button>
									</AILabelActions>
								</AILabelContent>
							</AILabel>
						) : undefined
					}
				>
					<div className="message-header">
						<Tag type="purple" renderIcon={Code}>
							{message.author}
						</Tag>
					</div>
					<p className="message-content">{message.content}</p>
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

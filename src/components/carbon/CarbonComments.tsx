/** biome-ignore-all lint/suspicious/noReactSpecificProps: Astro */
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
/** biome-ignore-all lint/correctness/useUniqueElementIds: Astro */
import { useState } from "react";
import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	Tag,
	TextInput,
	TextArea,
	Button,
	InlineNotification,
	Stack,
	Grid,
	Column,
	Tile,
	AILabel,
	AILabelContent,
} from "@carbon/react";
import { User, Email, Link, Chat, Reply } from "@carbon/icons-react";
import "./CarbonComments.scss";
import nameGen from "@/scripts/name-gen";

interface Comment {
	id: string;
	data: {
		id: string;
		name: string;
		date: Date;
		message?: string;
		email?: string;
		url?: string;
		reply?: string;
		ua?: string;
	};
	rendered?: {
		html: string;
	};
}

interface CarbonCommentItemProps {
	comment: Comment;
}

function CarbonCommentItem({ comment }: CarbonCommentItemProps) {
	const { data } = comment;
	const message = data.message ?? comment.rendered?.html;

	let url: URL | undefined;
	if (data.url) {
		try {
			url = new URL(data.url);
		} catch (e) {
			// Invalid URL
		}
	}

	const reply = data.reply
		? {
				...comment,
				data: {
					...data,
					id: `${comment.id}r`,
					name: "猫猫",
					message: data.reply,
				},
			}
		: undefined;

	return (
		<Tile id={`comment-${data.id}`} className="carbon-comment-item">
			<Stack gap={4}>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "0.5rem",
					}}
				>
					<h4
						style={{
							margin: 0,
							fontSize: "var(--cds-productive-heading-02-font-size)",
							fontWeight: 400,
						}}
					>
						{url ? (
							<a
								href={url.toString()}
								target="_blank"
								rel="noopener noreferrer"
								style={{
									color: "var(--cds-link-primary)",
									textDecoration: "none",
								}}
							>
								{data.name}
							</a>
						) : (
							data.name
						)}
					</h4>
					<a
						href={`#comment-${data.id}`}
						style={{
							fontSize: "0.875rem",
							color: "var(--cds-text-secondary)",
							textDecoration: "none",
							fontFamily: "'IBM Plex Mono', monospace",
						}}
					>
						<time dateTime={data.date.toISOString()}>
							{data.date.toLocaleDateString("zh")}
						</time>
					</a>
				</div>
				<div
					className="comment-message"
					dangerouslySetInnerHTML={{ __html: message || "" }}
				/>
				{reply && (
					<div
						style={{
							marginLeft: "var(--cds-spacing-05)",
							paddingLeft: "var(--cds-spacing-05)",
							borderLeft: "2px solid var(--cds-border-subtle)",
						}}
					>
						<Stack gap={2}>
							<Tag renderIcon={Reply}>回复</Tag>
							<CarbonCommentItem comment={reply} />
						</Stack>
					</div>
				)}
			</Stack>
		</Tile>
	);
}

interface CarbonCommentsProps {
	comments: Comment[];
	lang?: string;
	slug?: string;
}

export default function CarbonComments({
	comments,
	lang = "zh",
	slug = "",
}: CarbonCommentsProps) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		url: "",
		email: "",
		message: "",
	});
	const [showWarning, setShowWarning] = useState(false);

	const placeholders = [
		"请洒潘江，各倾陆海云尔…",
		"矮纸斜行闲作草，晴窗细乳戏分茶…",
		"此意在人间，试听徽外三两弦…",
		"给主人留下些什么吧～",
	];
	const placeholder =
		placeholders[Math.floor(Math.random() * placeholders.length)];

	const t = {
		title: lang === "en" ? "Comments" : "评论",
		nickname: lang === "en" ? "Nickname" : "昵称",
		homepage_url: lang === "en" ? "Homepage URL" : "主页 URL",
		message: lang === "en" ? "Message" : "留言",
		submit: lang === "en" ? "Submit" : "发送",
		writeComment: lang === "en" ? "Write a Comment" : "写评论",
	};

	return (
		<>
			<Grid fullWidth narrow>
				<Column lg={16} md={8} sm={4}>
					<Stack gap={7}>
						<h2
							style={{
								textAlign: "center",
								fontSize: "var(--cds-productive-heading-04-font-size)",
								fontWeight: 400,
								margin: 0,
							}}
						>
							{t.title}
						</h2>

						{comments.length >= 1 && (
							<Stack gap={5}>
								{comments.map((comment) => (
									<CarbonCommentItem key={comment.id} comment={comment} />
								))}
							</Stack>
						)}

						<div style={{ textAlign: "center" }}>
							<Button kind="primary" onClick={() => setIsFormOpen(true)}>
								{t.writeComment}
							</Button>
						</div>
					</Stack>
				</Column>
			</Grid>

			<ComposedModal
				open={isFormOpen}
				onClose={() => setIsFormOpen(false)}
				preventCloseOnClickOutside
			>
				<ModalHeader title={t.writeComment} />
				<ModalBody>
					<form
						action="https://gudugada.xinshijiededa.men/comment"
						method="post"
						className="carbon-comment-form"
					>
						<TextInput
							id="user-name"
							name="user[name]"
							labelText={`${t.nickname} *`}
							placeholder={nameGen()}
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							decorator={
								<AILabel className="ai-label-container">
									<AILabelContent>随机生成的</AILabelContent>
								</AILabel>
							}
							required
						/>

						<TextInput
							id="user-url"
							name="user[url]"
							labelText={`${t.homepage_url} *`}
							placeholder="你的个人主页、博客、社交媒体等的 URL"
							value={formData.url}
							onChange={(e) =>
								setFormData({ ...formData, url: e.target.value })
							}
							required
						/>

						<TextInput
							id="user-email"
							name="user[email]"
							labelText="Email / 邮箱"
							placeholder="公开显示"
							type="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({ ...formData, email: e.target.value })
							}
							onFocus={() => setShowWarning(true)}
							onBlur={() => setShowWarning(false)}
						/>

						{showWarning && (
							<InlineNotification
								kind="warning"
								title="注意"
								subtitle="请勿填写，会被当作 spam！"
								lowContrast
								hideCloseButton
							/>
						)}

						<TextArea
							id="message"
							name="message"
							labelText={`${t.message} *`}
							placeholder={`${placeholder}\n\nMarkdown 语法可用。`}
							rows={6}
							value={formData.message}
							onChange={(e) =>
								setFormData({ ...formData, message: e.target.value })
							}
							required
						/>

						<input type="hidden" name="slug" value={slug} />

						<div className="form-actions">
							<Button type="submit" kind="primary">
								{t.submit}
							</Button>
							<Button
								type="button"
								kind="secondary"
								onClick={() => setIsFormOpen(false)}
							>
								取消
							</Button>
						</div>

						<p className="form-info">
							评论将在审核后显示，阁下可以在本博客的 Github 仓库的{" "}
							<a
								href="https://github.com/OverflowCat/blog/pulls/app%2Foverflowcat"
								target="_blank"
								rel="noopener noreferrer"
							>
								拉取请求列表
							</a>{" "}
							中查看。提交成功后会自动跳转。
						</p>
					</form>
				</ModalBody>
			</ComposedModal>
		</>
	);
}

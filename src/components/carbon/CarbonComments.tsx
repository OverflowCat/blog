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
import { User, Link, Chat, Reply } from "@carbon/icons-react";
import "./CarbonComments.scss";
import nameGen from "@/scripts/name-gen";
import { _t } from "@/scripts/i18n";

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
	lang: string;
}

function CarbonCommentItem({ comment, lang }: CarbonCommentItemProps) {
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

	const t = _t(lang);
	const reply = data.reply
		? {
				...comment,
				data: {
					...data,
					id: `${comment.id}r`,
					name: t("comments.author_name"),
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
							<Tag renderIcon={Reply}>{t("comments.reply")}</Tag>
							<CarbonCommentItem comment={reply} lang={lang} />
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

	const t = _t(lang);
	const placeholders = t("comments.placeholders");
	const placeholder =
		placeholders[Math.floor(Math.random() * placeholders.length)];

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
							{t("comments.title")}
						</h2>

						{comments.length >= 1 && (
							<Stack gap={5}>
								{comments.map((comment) => (
									<CarbonCommentItem key={comment.id} comment={comment} lang={lang} />
								))}
							</Stack>
						)}

						<div style={{ textAlign: "center" }}>
							<Button kind="primary" onClick={() => setIsFormOpen(true)}>
								{t("comments.write_comment")}
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
				<ModalHeader title={t("comments.write_comment")} />
				<ModalBody>
					<form
						action="https://gudugada.xinshijiededa.men/comment"
						method="post"
						className="carbon-comment-form"
					>
						<TextInput
							id="user-name"
							name="user[name]"
							labelText={`${t("comments.nickname")} *`}
							placeholder={nameGen()}
							value={formData.name}
							onChange={(e) =>
								setFormData({ ...formData, name: e.target.value })
							}
							decorator={
								<AILabel className="ai-label-container">
									<AILabelContent>{t("comments.randomly_generated")}</AILabelContent>
								</AILabel>
							}
							required
						/>

						<TextInput
							id="user-url"
							name="user[url]"
							labelText={`${t("comments.homepage_url")} *`}
							placeholder={t("comments.homepage_placeholder")}
							value={formData.url}
							onChange={(e) =>
								setFormData({ ...formData, url: e.target.value })
							}
							required
						/>

						<TextInput
							id="user-email"
							name="user[email]"
							labelText={`${t("comments.email")} / ${t("comments.email_placeholder")}`}
							placeholder={t("comments.email_placeholder")}
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
								title={t("comments.email_warning_title")}
								subtitle={t("comments.email_warning_subtitle")}
								lowContrast
								hideCloseButton
							/>
						)}

						<TextArea
							id="message"
							name="message"
							labelText={`${t("comments.message")} *`}
							placeholder={`${placeholder}\n\n${t("comments.format_hint")}`}
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
								{t("comments.submit")}
							</Button>
							<Button
								type="button"
								kind="secondary"
								onClick={() => setIsFormOpen(false)}
							>
								{t("comments.cancel")}
							</Button>
						</div>

						<p className="form-info">
							{t("comments.moderation_notice")}{" "}
							<a
								href="https://github.com/OverflowCat/blog/pulls/app%2Foverflowcat"
								target="_blank"
								rel="noopener noreferrer"
							>
								{t("comments.moderation_notice_link")}
							</a>{" "}
							{t("comments.moderation_notice_end")}
						</p>
					</form>
				</ModalBody>
			</ComposedModal>
		</>
	);
}

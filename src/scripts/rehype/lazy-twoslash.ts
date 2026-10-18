import { createRequire } from "node:module";
import {
	createTransformerFactory,
	rendererRich,
	type TwoslashShikiFunction,
} from "@shikijs/twoslash/core";

export default function lazyTwoslash() {
	let twoslasher: TwoslashShikiFunction | undefined;
	const run: TwoslashShikiFunction = (code, lang, options) => {
		// Let the upstream filter handle languages, aliases and opt-out markers.
		// Only accepted snippets need TypeScript and its virtual filesystem.
		if (!twoslasher) {
			const { createTwoslasher } = createRequire(import.meta.url)(
				"twoslash",
			) as typeof import("twoslash");
			twoslasher = createTwoslasher({
				compilerOptions: { moduleResolution: 100 },
			});
		}
		return twoslasher(code, lang, options);
	};
	return createTransformerFactory(run, rendererRich())();
}

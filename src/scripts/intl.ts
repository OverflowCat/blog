const segmenter = new Intl.Segmenter();

export function truncate(str: string, length: number) {
	const iter = segmenter.segment(str);
	const graphemes = [];
	for (const { segment } of iter) {
		graphemes.push(segment);
		if (graphemes.length >= length) break;
	}
	let res = graphemes.join("");
	if (graphemes.length < str.length) {
		res += "…";
	}
	return res;
}
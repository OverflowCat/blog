export function moelify(str: string) {
	return str
		.replaceAll("v", "ū")
		.replaceAll("iy", "<s>i</s>y")
		.replaceAll("uw", "<s>u</s>w")
		.replaceAll("mbi", "m<s>b</s>i");
}

export function manjuify(s: string) {
	const str = s.replace(/(?<=\S|\b)-/, "");
	let tmp = "";
	if (str.length > 0) {
		for (let i = 0; i < str.length; i++) {
			const val = str.charAt(i);
			let prev = " ";
			if (i > 0) {
				prev = str.charAt(i - 1);
			}
			if (val === "a") {
				tmp += "ᠠ";
			} else if (val === "e") {
				tmp += "ᡝ";
			} else if (val === "i") {
				tmp += "ᡳ";
			} else if (val === "o") {
				tmp += "ᠣ";
			} else if (val === "u") {
				tmp += "ᡠ";
			} else if (val === "v") {
				tmp += "ᡡ";
			} else if (val === "@" || val === "ū") {
				tmp += "ᡡ";
			} else if (val === "n") {
				tmp += "ᠨ";
			} else if (val === "N") {
				tmp += "ᠩ";
			} else if (val === "b") {
				tmp += "ᠪ";
			} else if (val === "p") {
				tmp += "ᡦ";
			} else if (val === "x") {
				tmp += "ᡧ";
			} else if (val === "S" || val === "š" || val === "x") {
				tmp += "ᡧ";
			} else if (val === "k") {
				tmp += "ᡴ";
			} else if (val === "g") {
				if (prev === "ᠨ" || prev === "n") {
					tmp = tmp.substring(0, tmp.length - 1);
					tmp += "ᠩ";
				} else {
					tmp += "ᡤ";
				}
			} else if (val === "h") {
				tmp += "ᡥ";
			} else if (val === "m") {
				tmp += "ᠮ";
			} else if (val === "l") {
				tmp += "ᠯ";
			} else if (val === "t") {
				tmp += "ᡨ";
			} else if (val === "d") {
				tmp += "ᡩ";
			} else if (val === "s") {
				if (prev === "ᡨ" || prev === "t") {
					tmp = tmp.substring(0, tmp.length - 1);
					tmp += "ᡮ";
				} else {
					tmp += "ᠰ";
				}
			} else if (val === "c" || val === "q") {
				tmp += "ᠴ";
			} else if (val === "j") {
				tmp += "ᠵ";
			} else if (val === "y") {
				tmp += "ᠶ";
			} else if (val === "r") {
				tmp += "ᡵ";
			} else if (val === "w") {
				tmp += "ᠸ";
			} else if (val === "f") {
				tmp += "ᡶ";
			} else if (val === "K") {
				tmp += "ᠺ";
			} else if (val === "G") {
				tmp += "ᡬ";
			} else if (val === "H") {
				tmp += "ᡭ";
			} else if (val === "J") {
				tmp += "ᡷ";
			} else if (val === "C") {
				tmp += "ᡱ";
			} else if (val === "R") {
				tmp += "ᡰ";
			} else if (val === "z") {
				if (prev === "ᡩ" || prev === "d") {
					tmp = tmp.substring(0, tmp.length - 1);
					tmp += "ᡯ";
				} else {
					tmp += "ᡯ"; //"z" org
				}
			} else if (val === "'") {
				tmp += "\u180B";
			} else if (val === "." || val === ":") {
				tmp += "᠉";
			} else if (val === ",") {
				tmp += "᠈";
			} else if (val === '"') {
				tmp += "\u180C";
			} else if (val === "`") {
				tmp += "\u180D";
			} else if (val === "_") {
				tmp += "\u180E";
			} else if (val === "*") {
				tmp += "\u202F";
			} else if (val === "-") {
				tmp += "\u200D";
			} else {
				tmp += val;
			}
		}
	}
	return tmp;
}

<script lang="ts">
export let theme: "light" | "dark";

import { onMount } from "svelte";

onMount(() => {
	const select = document.getElementById("theme-select") as HTMLSelectElement;
	if (!select) console.error("Theme select not found");
	// add event listener to select
	select.addEventListener("change", (e) => {
		let v = select.value as "light" | "dark" | "system";
		console.log("Theme changed to", v);
		if (v === "system") {
			// get system theme
			v = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		theme = v;
	});
	// document.querySelectorAll("[data-telegram-post]").forEach((elem) => {
	// 	elem.setAttribute("data-dark", theme === "dark" ? "1" : "0");
	// });
});
</script>

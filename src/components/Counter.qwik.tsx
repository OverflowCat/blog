/** @jsxImportSource @builder.io/qwik */
import { component$, useSignal, useStore } from "@builder.io/qwik";

export const Counter = component$(() => {
	const counter = useSignal(0);
	const store = useStore({
		src: "https://cdn.rive.app/animations/vehicles.riv",
		artwork: "jeep",
	});
	return (
		<div>
			<button type="button" onClick$={() => counter.value++}>
				{counter.value}
			</button>
		</div>
	);
});

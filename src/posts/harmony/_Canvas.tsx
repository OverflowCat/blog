import { useRef, useEffect, useState } from "react";
import "7.css/dist/7.scoped.css";

const SinCanvas = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [size, setSize] = useState({ width: 0, height: 0 });

	const backgroundColor = "#c0d695";

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas || size.width <= 0 || size.height <= 0) {
			return;
		}
		canvas.width = size.width;
		canvas.height = size.height;
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			console.error("Failed to get 2D canvas context");
			return;
		}

		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, size.width, size.height);

		// 2. Draw the discrete sine wave points
		ctx.fillStyle = "#000000";

		const centerY = size.height / 2;
		for (let x = 0; x < size.width; x++) {
			const y = centerY + 60 * Math.sin(0.1 * x);
			ctx.fillRect(x, Math.round(y), 1, 1);
		}
	}, [size]);

	// Effect to set up and clean up the ResizeObserver
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;
		const updateSize = () => {
			setSize({
				width: container.clientWidth,
				height: container.clientHeight,
			});
		};
		updateSize();
		const resizeObserver = new ResizeObserver((entries) => {
			if (!entries || entries.length === 0) {
				return;
			}
			const entry = entries[0];
			if (
				entry.contentRect.width !== size.width ||
				entry.contentRect.height !== size.height
			) {
				setSize({
					width: entry.contentRect.width,
					height: entry.contentRect.height,
				});
			}
		});
		resizeObserver.observe(container);
		return () => {
			resizeObserver.unobserve(container);
			resizeObserver.disconnect();
		};
	}, [size]);
	return (
		<section className="win7" style={{
			// biome-ignore lint/suspicious/noExplicitAny: CSS variable
			["--window-background-color" as any]: "#06907d"
		}}>
			<div
				className="window w-full h-365px overflow-hidden relative resize min-h-25 min-w-50"
				ref={containerRef}
			>
				<div className="title-bar">
					<div className="title-bar-text">Cangjie</div>
					<div className="title-bar-controls">
						<button aria-label="Minimize" />
						<button aria-label="Maximize" />
						<button aria-label="Close" />
					</div>
				</div>
				<div className="window-body m-0!">
					<canvas className="m-0 block w-full h-full" ref={canvasRef} />
				</div>
			</div>
		</section>
	);
};

export default SinCanvas;

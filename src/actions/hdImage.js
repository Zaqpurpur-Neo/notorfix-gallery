export function hdImage(node, hdSrc) {
	let img = new Image();
	let cancelled = false;

	img.src = hdSrc;
	img.onload = () => {
		if (cancelled) return;
		node.src = hdSrc;
		node.classList.add("hd-loaded");
	};

	return {
		destroy() {
			cancelled = true;
		},
	};
}


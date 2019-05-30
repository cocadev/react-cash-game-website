export function cutCorners(x, y) {
	return {
		WebkitClipPath: `polygon(${x}% 0, ${100 - (x)}% 0, 100% ${y}%, 100% ${100 - y}%, ${100 - (x)}% 100%, ${x}% 100%, 0 ${100 - y}%, 0 ${y}%)`,
		clipPath: `polygon(${x}% 0, ${100 - (x)}% 0, 100% ${y}%, 100% ${100 - y}%, ${100 - (x)}% 100%, ${x}% 100%, 0 ${100 - y}%, 0 ${y}%)`
	};
}

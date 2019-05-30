export default function customTween(allPoints, time, onUpdates) {
	TWEEN.autoPlay(true);
	let counterTwin = null;
	for (let i = 0; i < allPoints.length - 1; i++) {
		const twin = new TWEEN.Tween(allPoints[i]).to(allPoints[i + 1], time / (allPoints.length - 1)).on("update", onUpdates[i]);

		if (!counterTwin) {
			counterTwin = twin;
		} else {
			counterTwin.on("complete", () => {
				twin.start();
			});
		}
	}
	counterTwin.start();
}

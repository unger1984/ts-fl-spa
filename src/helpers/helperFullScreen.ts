/**
 * Toggle FullScreen Mode
 */
interface Document extends HTMLDocument {
	mozCancelFullScreen?: () => void;
	webkitExitFullscreen?: () => void;
	msExitFullscreen?: () => void;
	mozFullScreenElement?: () => void;
	webkitFullscreenElement?: () => void;
	msFullscreenElement?: () => void;
}

interface Element extends HTMLElement {
	exitFullscreen?: () => void;
	mozRequestFullScreen?: () => void;
	webkitRequestFullScreen?: () => void;
	msRequestFullscreen?: () => void;
}

export const toggleFullScreen = (): void => {
	const doc: Document = window.document;
	const docEl: Element = doc.documentElement;

	const requestFullScreen =
		docEl.requestFullscreen ||
		docEl.mozRequestFullScreen ||
		docEl.webkitRequestFullScreen ||
		docEl.msRequestFullscreen;
	const cancelFullScreen =
		doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

	if (
		!doc.fullscreenElement &&
		!doc.mozFullScreenElement &&
		!doc.webkitFullscreenElement &&
		!doc.msFullscreenElement
	) {
		requestFullScreen.call(docEl);
	} else {
		cancelFullScreen.call(doc);
	}
};

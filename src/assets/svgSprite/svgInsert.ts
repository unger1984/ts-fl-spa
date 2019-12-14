interface SVGOptionsInterface {
	filename?: string;
	path: string;
	name: string;
}

const __svg__ = { path: '*.svg', name: 'images/svg/sprite.svg' };

const svgXHR = function(options: SVGOptionsInterface): void {
	let url: string | null = null;
	let baseUrl = undefined;

	// eslint-disable-next-line no-unused-expressions
	if (options && options.filename) {
		url = options.filename;
	}

	if (!url) {
		return;
	}

	const _ajax: XMLHttpRequest = new XMLHttpRequest();

	baseUrl =
		window.location.protocol +
		'//' +
		window.location.hostname +
		(window.location.port ? ':' + window.location.port : '');

	const _fullPath = (baseUrl + '/' + url).replace(/([^:]\/)\/+/g, '$1');
	_ajax.open('GET', _fullPath, true);
	_ajax.onprogress = function(): boolean {
		return false;
	};
	_ajax.onload = function(): void {
		if (!_ajax.responseText || _ajax.responseText.substr(0, 4) !== '<svg') {
			throw Error('Invalid SVG Response');
		}
		if (_ajax.status < 200 || _ajax.status >= 300) {
			return;
		}
		const div = document.createElement('div');
		div.innerHTML = _ajax.responseText;
		document.body.insertBefore(div, document.body.childNodes[0]);
	};
	_ajax.send();
};

svgXHR(__svg__);

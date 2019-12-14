import { storageKey } from '../config';
import { UIStateInterface } from 'ducks/ui';

class LocalStorage {
	private storage: Storage | null;

	constructor() {
		this.storage = this.__supportsHtml5Storage() ? window.localStorage : null;
	}

	__supportsHtml5Storage(): boolean {
		try {
			return 'localStorage' in window && window.localStorage !== null;
		} catch (exc) {
			return false;
		}
	}

	saveInterface(ui: UIStateInterface) {
		if (!this.storage) {
			return null;
		}
		this.storage.setItem(`${storageKey}-ui`, JSON.stringify(ui));
	}

	fetchInterface(): UIStateInterface {
		const uiStored = this.storage && this.storage.getItem(`${storageKey}-ui`);
		if (uiStored) {
			const ui = JSON.parse(uiStored) as UIStateInterface;
			return { ...ui, isPreloader: false };
		}
		return {
			isPreloader: false,
		};
	}

	clearStorage() {
		if (this.storage) {
			this.storage.clear();
		}
	}
}

export default new LocalStorage();

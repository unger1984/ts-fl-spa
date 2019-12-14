import { storageKey } from '../config';
import { UIState } from 'ducks/ui';

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

	saveInterface(ui: UIState): void {
		if (!this.storage) {
			return;
		}
		this.storage.setItem(`${storageKey}-ui`, JSON.stringify(ui));
	}

	fetchInterface(): UIState {
		const uiStored = this.storage && this.storage.getItem(`${storageKey}-ui`);
		if (uiStored) {
			const ui = JSON.parse(uiStored) as UIState;
			return { ...ui, isPreloader: false };
		}
		return {
			isPreloader: false,
		};
	}

	clearStorage(): void {
		if (this.storage) {
			this.storage.clear();
		}
	}
}

export default new LocalStorage();

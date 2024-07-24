import { ensureElement } from '../../utils/utils';
import { IPage } from '../../types';

export interface IPageConstructor {
	new (): Page;
}

export class Page implements IPage {
	_counter: HTMLElement;
	_catalog: HTMLElement;
	_basket: HTMLElement;

	constructor() {
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._counter = ensureElement<HTMLElement>('.header__basket-counter');
	}

	set counter(value: number) {
		if (this._counter) {
			this._counter.textContent = String(value);
		}
	}

	set catalog(items: HTMLElement[]) {
		this._catalog.prepend(...items);
	}
}

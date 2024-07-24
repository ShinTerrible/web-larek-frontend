import { ensureElement } from '../../utils/utils';
import { IModal } from '../../types/index';

export interface IModalConstructor {
	new (): Modal;
}

export class Modal implements IModal {
	closeButton: HTMLButtonElement;
	_content: HTMLElement;
	modalElement: HTMLElement;

	constructor() {
		const modal = ensureElement('.modal');
		this.closeButton = ensureElement(
			'.modal__close',
			modal
		) as HTMLButtonElement;
		this._content = ensureElement('.modal__content', modal) as HTMLElement;

		this.closeButton.addEventListener('click', this.close.bind(this));
		modal.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (event) => {
			event.stopPropagation();
		});

		this.modalElement = modal;
	}

	set content(value: HTMLElement) {
		this._content.replaceChildren(value);
	}

	open() {
		this.modalElement.classList.add('modal_active');
	}
	close() {
		this.modalElement.classList.remove('modal_active');
		this.content = null;
	}
}

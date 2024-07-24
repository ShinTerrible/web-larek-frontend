import { ensureElement } from '../../utils/utils';
import { cloneTemplate } from '../../utils/utils';
import { EventEmitter } from '../base/events';

export class Success extends EventEmitter {
	protected orderSuccess: HTMLElement;
	constructor(formTemplate: HTMLTemplateElement, total: number) {
		super();
		this.orderSuccess = cloneTemplate(formTemplate);
		const totalText = ensureElement(
			'.order-success__description',
			this.orderSuccess
		);
		totalText.textContent = `Списано ${total} синапсов`;
		const button = ensureElement('.button', this.orderSuccess);
		button.addEventListener('click', () => {
			this.emit('close:success');
		});
	}
	render() {
		return this.orderSuccess;
	}
}

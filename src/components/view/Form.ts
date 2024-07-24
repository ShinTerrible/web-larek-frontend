import { EventEmitter } from '../base/events';
import {
	ensureElement,
	ensureAllElements,
	cloneTemplate,
} from '../../utils/utils';
import { FormData, IForm } from '../../types';

export interface IFormConstructor {
	new (): Form;
}

// класс отображение
export class Form extends EventEmitter implements IForm {
	_formElement: HTMLFormElement;
	_submitButton: HTMLButtonElement;
	_formData: FormData;

	constructor() {
		super();
		this._formData = {
			payment: '',
			email: '',
			phone: '',
			address: '',
		};
	}

	setOrderForm(formTemplate: HTMLTemplateElement): HTMLFormElement {
		this._formElement = cloneTemplate(formTemplate);
		const inputFields = ensureElement<HTMLElement>(
			'.order__buttons',
			this._formElement
		);

		const button = ensureElement<HTMLButtonElement>(
			'.order__button',
			this._formElement
		);

		const input = ensureElement<HTMLInputElement>(
			'.form__input',
			this._formElement
		);

		const [cardBtn, cashBtn] = ensureAllElements('.button', inputFields);
		let payment: string | null = null;

		this.toggleButtonState(button, input, this._formElement, payment);

		const card = cardBtn.getAttribute('name');
		const cash = cashBtn.getAttribute('name');
		this.showError(this._formElement, input, payment);
		inputFields.addEventListener('click', (event: Event) => {
			let bt: HTMLButtonElement = event.target as HTMLButtonElement;
			if (bt === cardBtn) {
				bt.classList.add('button_alt-active');
				cashBtn.classList.remove('button_alt-active');
				payment = card;
			} else {
				bt.classList.add('button_alt-active');
				cardBtn.classList.remove('button_alt-active');
				payment = cash;
			}
			this.toggleButtonState(button, input, this._formElement, payment);
			this.showError(this._formElement, input, payment);
		});

		input.addEventListener('input', () => {
			this.toggleButtonState(button, input, this._formElement, payment);
		});

		this._formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._setValue(formTemplate.getAttribute('id'), [input.value, payment]);
			this.emit('form:change');
		});
		return this._formElement;
	}

	setContactsForm(formTemplate: HTMLTemplateElement): HTMLFormElement {
		this._formElement = cloneTemplate(formTemplate);
		const button = ensureElement<HTMLButtonElement>(
			'.button',
			this._formElement
		);
		const [email, phone] = ensureAllElements<HTMLInputElement>(
			'.form__input',
			this._formElement
		);
		this.toggleButtonState(button, [email, phone], this._formElement);

		[email, phone].forEach((elem) => {
			this.showError(this._formElement, elem);
			elem.addEventListener('input', () => {
				this.toggleButtonState(button, [email, phone], this._formElement);
			});
		});

		this._formElement.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._setValue(formTemplate.getAttribute('id'), [
				email.value,
				phone.value,
			]);
			this.emit('form:success', { values: this.value });
		});
		return this._formElement;
	}

	_setValue(formName: string, arr: string[]): FormData {
		if (formName === 'order') {
			const [address, payment] = arr;
			this._formData.address = address;
			this._formData.payment = payment;
		} else {
			const [email, phone] = arr;
			this._formData.email = email;
			this._formData.phone = phone;
		}
		return this._formData;
	}

	get value() {
		return this._formData;
	}

	protected hasValidInput(
		inputList: HTMLInputElement[] | HTMLInputElement,
		payment?: string
	): boolean {
		if (Array.isArray(inputList)) {
			return inputList.every((element) => {
				return element.validity.valid && element.value !== '';
			});
		} else {
			return (
				inputList.validity.valid && inputList.value !== '' && payment !== null
			);
		}
	}

	protected toggleButtonState(
		buttonElement: HTMLButtonElement,
		inputList: HTMLInputElement[] | HTMLInputElement,
		formElement: HTMLFormElement,
		payment?: string
	): void {
		if (this.hasValidInput(inputList, payment)) {
			this.hideError(formElement);
			buttonElement.disabled = false;
		} else {
			buttonElement.disabled = true;
		}
	}

	protected showError(
		formElement: HTMLFormElement,
		input: HTMLInputElement,
		payment?: string | null
	): void {
		const errorElement = formElement.querySelector(`.form__errors`);
		if (payment === null) {
			errorElement.textContent = 'Выберете способ оплаты';
		} else {
			errorElement.textContent = input.validationMessage;
		}
	}

	protected hideError(formElement: HTMLFormElement): void {
		const errorElement = formElement.querySelector(`.form__errors`);
		errorElement.textContent = '';
	}
}

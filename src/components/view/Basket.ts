import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Modal } from './Modal';
import { templatesConfig } from '../Templates';
import { ProductView } from './ProductCards';
// import { BasketModel } from '../model/BasketModel';
import { Page } from './Page';
import { IBasketView, IBasketModel } from '../../types/index';

export interface IBasketViewConstructor {
	new (basketTemplate: HTMLTemplateElement): BasketView;
}

export class BasketView extends EventEmitter implements IBasketView {
	protected basketTemplate: HTMLTemplateElement;
	protected basketContainer: HTMLElement;
	protected basketButton: HTMLButtonElement;
	protected basketCounter: HTMLSpanElement;
	protected basketList: HTMLElement;
	protected basketPrice: HTMLSpanElement;
	protected basketOrderButton: HTMLButtonElement;
	modal: Modal;

	constructor(basketTemplate: HTMLTemplateElement) {
		super();
		this.basketTemplate = basketTemplate;
		this.basketContainer = this.basketTemplate.content
			.querySelector('.basket')
			.cloneNode(true) as HTMLElement;
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket');
		this.basketCounter = ensureElement<HTMLSpanElement>(
			'.header__basket-counter',
			this.basketButton
		);
		this.basketList = ensureElement<HTMLElement>(
			'.basket__list',
			this.basketContainer
		);
		this.basketPrice = ensureElement<HTMLSpanElement>(
			'.basket__price',
			this.basketContainer
		);
		this.basketOrderButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.basketContainer
		);
	}

	render(
		basketModel: IBasketModel,
		product: ProductView,
		page: Page
	): HTMLElement {
		let cards = basketModel.itemsForView.map((item, index) => {
			let renderItem = product.renderBasketCard(
				templatesConfig.cardBasketTemplate,
				item,
				index + 1
			);
			return renderItem;
		});

		page.counter = basketModel.items.length;

		this.basketList.replaceChildren(...cards);

		this.basketPrice.textContent = basketModel.countTotal() + ' синапсов';

		this.modal = new Modal();
		this.basketButton.addEventListener('click', () => {
			this.modal.content = this.basketContainer;
			this.modal.open();
		});
		if (basketModel.items.length === 0) {
			this.basketOrderButton.disabled = true;
		} else {
			this.basketOrderButton.disabled = false;
		}
		this.basketOrderButton.addEventListener('click', () => {
			this.emit('order');
		});

		return this.basketList;
	}
}

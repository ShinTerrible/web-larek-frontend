import { EventEmitter } from '../base/events';
import { ensureElement, cloneTemplate } from '../../utils/utils';
import { IProductCard, IProductView } from '../../types/index';
import { templatesConfig } from '../Templates';
import { BasketView } from './Basket';

export interface IProductViewConstructor {
	new (): ProductView;
}

export class ProductView extends EventEmitter implements IProductView {
	_cards: IProductCard[];
	_cardTemplate: HTMLTemplateElement;
	_id: string;
	basket: BasketView;

	constructor() {
		super();
		this._id = '';
		this.basket = new BasketView(templatesConfig.basketTemplate);
	}

	set id(value: string) {
		this._id = value;
	}

	get id(): string {
		return this._id || null;
	}

	set items(cards: IProductCard[]) {
		this._cards = cards;
	}

	get items(): IProductCard[] {
		if (this._cards === undefined) {
			this.items = [];
		}
		return this._cards;
	}

	getItem(id: string): IProductCard {
		return this._cards.find((card) => card.id === id);
	}

	checkCardCategory(cardItemCategory: string): string {
		let color: string = '';
		switch (cardItemCategory) {
			case 'софт-скил':
				color = 'card__category_soft';
				break;
			case 'хард-скил':
				color = 'card__category_hard';
				break;
			case 'другое':
				color = 'card__category_other';
				break;
			case 'дополнительное':
				color = 'card__category_additional';
				break;
			case 'кнопка':
				color = 'card__category_button';
				break;
		}
		return color;
	}

	checkCardPrice(price: number): string {
		return price === null ? 'Бесценно' : price + ' синапсов';
	}

	renderGalleryCard(
		cardTemplate: HTMLTemplateElement,
		cardItems: IProductCard[]
	): HTMLElement[] {
		const cardItemsHtml = cardItems.map((cardItem) => {
			const card = cloneTemplate(cardTemplate);
			const category = ensureElement('.card__category', card) as HTMLElement;
			const title = ensureElement('.card__title', card) as HTMLElement;
			const image = ensureElement('.card__image', card) as HTMLImageElement;
			const price = ensureElement('.card__price', card) as HTMLElement;
			const item = this.renderCardPrewiew(
				templatesConfig.cardPreviewTemplate,
				cardItem
			);
			card.addEventListener('click', () => {
				this.emit('open:card', { item: item });
			});

			category.textContent = cardItem.category;
			category.classList.add(this.checkCardCategory(cardItem.category));
			title.textContent = cardItem.title;
			image.setAttribute('src', cardItem.image);
			image.setAttribute('alt', cardItem.title);
			price.textContent = this.checkCardPrice(cardItem.price);
			this._id = card.id;
			return card;
		});

		return cardItemsHtml;
	}

	renderCardPrewiew(
		cardTemplate: HTMLTemplateElement,
		card: IProductCard
	): HTMLElement {
		const cardFull = cloneTemplate(cardTemplate);
		const image = ensureElement('.card__image', cardFull) as HTMLImageElement;
		const category = ensureElement('.card__category', cardFull) as HTMLElement;
		const title = ensureElement('.card__title', cardFull) as HTMLElement;
		const description = ensureElement('.card__text', cardFull) as HTMLElement;
		const button = ensureElement(
			'.card__button',
			cardFull
		) as HTMLButtonElement;
		const price = ensureElement('.card__price', cardFull) as HTMLElement;

		button.addEventListener('click', (event) => {
			this.emit('add:card', { item: card, event: event });
		});
		this.on('basket:changed', () => {
			button.disabled = false;
		});

		category.textContent = card.category;
		category.classList.add(this.checkCardCategory(card.category));
		title.textContent = card.title;
		description.textContent = card.description;
		image.setAttribute('src', card.image);
		image.setAttribute('alt', card.title);
		price.textContent = this.checkCardPrice(card.price);
		this._id = card.id;

		return cardFull;
	}

	renderBasketCard(
		cardTemplate: HTMLTemplateElement,
		card: IProductCard,
		positionNumber?: number
	): HTMLElement {
		const cardItem = cloneTemplate(cardTemplate);
		const basketIndex = ensureElement(
			'.basket__item-index',
			cardItem
		) as HTMLSpanElement;
		const basketCardTitle = ensureElement(
			'.card__title',
			cardItem
		) as HTMLSpanElement;
		const basketCardPrice = ensureElement(
			'.card__price',
			cardItem
		) as HTMLSpanElement;
		const basketDeleteButton = ensureElement(
			'.basket__item-delete',
			cardItem
		) as HTMLButtonElement;

		basketCardTitle.textContent = card.title;
		basketCardPrice.textContent = this.checkCardPrice(card.price);
		basketIndex.textContent = `${positionNumber}`;

		basketDeleteButton.addEventListener('click', () => {
			this.emit('remove:card', { item: card.id });
		});

		return cardItem;
	}
}

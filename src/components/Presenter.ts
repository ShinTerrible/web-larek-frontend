import { templatesConfig } from './Templates';
import { IProductViewConstructor, ProductView } from './view/ProductCards';
import { IProductCard } from '../types';
import { BasketModel } from './model/BasketModel';
import { BasketView, IBasketViewConstructor } from './view/Basket';
import { Modal, IModalConstructor } from './view/Modal';
import { Page, IPageConstructor } from './view/Page';
import { Form, IFormConstructor } from './view/Form';
import { ProductsAPI, IProductsAPIConstructor } from './base/ProductApi';
import { CDN_URL, API_URL } from '../utils/constants';
import { Success } from './view/Success';
import { FormData } from '../types';
import { IPresenter } from '../types';

export class Presenter implements IPresenter {
	_basketModel: BasketModel;
	_api: ProductsAPI;
	_main: HTMLElement;
	_page: Page;
	_products: ProductView;
	_basketView: BasketView;
	_form: Form;
	_modal: Modal;
	_cards: Promise<IProductCard[]>;

	constructor(
		protected apiConstructor: IProductsAPIConstructor,
		_basketModel: BasketModel,
		protected pageConstructor: IPageConstructor,
		protected productView: IProductViewConstructor,
		protected basketViewConstructor: IBasketViewConstructor,
		protected formConstructor: IFormConstructor,
		protected modalConstructor: IModalConstructor
	) {
		this._basketModel = _basketModel;
	}

	init() {
		this._api = new this.apiConstructor(CDN_URL, API_URL);
		this._cards = this._api.getProducts();
		this._page = new this.pageConstructor();
		this._products = new this.productView();
		this._basketView = new this.basketViewConstructor(
			templatesConfig.basketTemplate
		);
	}

	postData(formData: { values: FormData }): void {
		this._api
			.postOrder(this._basketModel.sendOrder(formData.values))
			.finally(() => {
				const success = new Success(
					templatesConfig.successTemplate,
					this._basketModel.countTotal()
				);
				this._modal = new this.modalConstructor();
				this._modal.content = success.render();
				success.on('close:success', () => {
					this._modal.close();
				});
				this._basketModel.cleanOrder();
				this.renderBasket();
			});
	}

	renderForm() {
		this._form = new this.formConstructor();
		this._modal = new this.modalConstructor();
		this._modal.content = this._form.setOrderForm(
			templatesConfig.orderTemplate
		);
		this._form.on('form:change', () => {
			this._modal.content = this._form.setContactsForm(
				templatesConfig.contactsTemplate
			);
			this._form.on('form:success', this.postData.bind(this));
		});
	}

	renderBasket() {
		this._basketView.on('order', this.renderForm.bind(this));
		this._basketView.render(this._basketModel, this._products, this._page);
	}

	openCardModal(item: { item: HTMLElement }) {
		this._modal = new this.modalConstructor();
		this._modal.content = item.item;
		this._modal.open();
	}

	addCard(card: { item: IProductCard; event: Event }) {
		let button: HTMLButtonElement = card.event.target as HTMLButtonElement;
		button.disabled = true;
		this._basketModel.add(card.item);
		this.renderBasket();
	}

	removeCard(card: { item: string }) {
		this._basketModel.remove(card.item);
		this.renderBasket();
		this._products.emit('basket:changed');
	}

	renderView() {
		this._cards.then((elems: IProductCard[]) => {
			this._products.items = elems;

			const cardsArray = this._products.renderGalleryCard(
				templatesConfig.cardCatalogTemplate,
				elems
			);

			this._page.catalog = cardsArray;

			cardsArray.map(() => {
				this._products.on('open:card', this.openCardModal.bind(this));
			});

			this._products.on('add:card', this.addCard.bind(this));
			this._products.on('remove:card', this.removeCard.bind(this));
		});
	}
}

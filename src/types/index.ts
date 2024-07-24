import { Page } from '../components/view/Page';
import { BasketModel } from '../components/model/BasketModel';
import { ProductView } from '../components/view/ProductCards';
import { ProductsAPI } from '../components/base/ProductApi';
import { BasketView } from '../components/view/Basket';
import { Form } from '../components/view/Form';
import { Modal } from '../components/view/Modal';
// Интерфейй данных товара
export interface IProduct {
	id: string;
	title: string;
	price: number | null;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface IProductCard extends IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IProductView {
	_cards: IProductCard[];
	_id: string;
	renderGalleryCard(
		cardTemplate: HTMLTemplateElement,
		cardItems: IProductCard[]
	): HTMLElement[];
	renderCardPrewiew(
		cardTemplate: HTMLTemplateElement,
		card: IProductCard
	): HTMLElement;
	renderBasketCard(
		cardTemplate: HTMLTemplateElement,
		card: IProductCard,
		positionNumber?: number
	): HTMLElement;
}

export interface IOrder extends FormData {
	total: number;
	items: string[];
}

export interface IBasketModel {
	items: IProduct[];
	itemsForView: IProductCard[];
	countTotal(): number;
	add(product: IProduct): IProduct | boolean;
	remove(id: string): void;
	sendOrder(data: FormData): IOrder;
	cleanOrder(): void;
}

//класс получения данных о продукте с APi
export interface IProductAPI {
	getProducts: () => Promise<IProductCard[]>;
}

export interface IBasketView {
	render(
		basketModel: BasketModel,
		product: ProductView,
		page: Page
	): HTMLElement;
}
// Интерфейс данных пользователя
export interface FormData {
	payment: string;
	email: string;
	phone: string;
	address: string;
}

export interface IForm {
	_formElement: HTMLFormElement;
	_submitButton: HTMLButtonElement;
	_formData: FormData;
	setOrderForm(formTemplate: HTMLTemplateElement): HTMLFormElement;
	setContactsForm(formTemplate: HTMLTemplateElement): HTMLFormElement;
	_setValue(formName: string, arr: string[]): void;
}

export interface IPage {
	_counter: HTMLElement;
	_catalog: HTMLElement;
	_basket: HTMLElement;
}

export interface IPresenter {
	_basketModel: BasketModel;
	_api: ProductsAPI;
	_main: HTMLElement;
	_page: Page;
	_products: ProductView;
	_basketView: BasketView;
	_form: Form;
	_modal: Modal;
	_cards: Promise<IProductCard[]>;
	init(): void;
	postData(formData: { values: FormData }): void;
	renderForm(): void;
	renderBasket(): void;
	openCardModal(item: { item: HTMLElement }): void;
	addCard(card: { item: IProductCard }): void;
	removeCard(card: { item: string }): void;
	renderView(): void;
}

export interface IModal {
	closeButton: HTMLButtonElement;
	_content: HTMLElement;
	modalElement: HTMLElement;
	open(): void;
	close(): void;
}

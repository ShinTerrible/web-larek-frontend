import { Api } from '../components/base/api';

// Интерфейй данных товара
interface IProductCard {
	image: string;
	text: string;
	price: number | null;
	header: string;
	category: string;
	id: string;
}

class ProductCardData implements IProductCard {
	image: string;
	text: string;
	price: number | null;
	header: string;
	category: string;
	id: string;
}

// Интерфейс класса для хранения данных о товаре
interface IProduct {
	items: Array<IProductCard>;
	openProductCardModal(template: Templates, element: IProductCard): void; // Функция для открытия модального окна с информацией о товаре
	addCardToOrder(cardId: string): void;
	closeModal(): void;
}

// Класс отвечает за хранение данных о товарах
class Products implements IProduct {
	items: Array<IProductCard>;
	constructor(items: Array<IProductCard>) {}
	openProductCardModal(template: Templates, element: IProductCard): void {}
	addCardToOrder(cardId: string): void {}
	closeModal(): void {}
}

// Класс отвечающий за получение данных о продукте с сервера
// Наследуется от общего класса Api и имплементирует интерфейс IProductAPI
class CardListAPI extends Api {
	readonly baseUrl: string;
	protected options: RequestInit;

	constructor(baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
	}

	async get(uri: string): Promise<Array<ProductCardData>> {
		return (await super.get(uri)) as Array<ProductCardData>;
	}
}

// Интерфейс данных пользователя
interface UserData {
	address?: string;
	email?: string;
	telephone?: string;
	typeOfPayment?: string;
}

// Интерфейс отображающий информацию о списке добавленных товаров в корзину.
interface IShoppingBasket {
	shoppingListApi: Array<IProductCard>;
	template: Templates;
	openShoppingBasketModal(
		template: Templates,
		shoppingListApi: Array<IProductCard>,
		total: number | null
	): void;
}

//Класс карзины покупателя
class ShoppingBasket implements IShoppingBasket {
	shoppingListApi: Array<IProductCard>;
	total: number | null;
	template: Templates;
	constructor(shoppingListApi: Array<IProductCard>, total: number | null) {}
	openShoppingBasketModal(
		template: Templates,
		shoppingListApi: Array<IProductCard>,
		total: number | null
	): void {}
	deleteItem(id: string): void {}
	order(): void {}
	closeModal(): void {}
}

// Интерфейс класса, описывающего форму с данными пользователя
interface FormData {
	value: UserData;
	getValue(value1: string | null, value2: string | null): UserData; // предполагается функция, которая будет записывать данные с двух форм в константу и заем ее возвращать
	postData(): void; // несовсем ясно из постмана, что мы отправляем на сервер при оформлении заказа,
	//  id заказчика или товара, и что делать с данными формы, поэтому описываю класс образно
	validation(value1: string | null, value2: string | null): boolean; //предполагается в момент заполнения полей формы
	closeModal(): void;
	continueButton(): void;
	submitFormButton(): void;
}

// Общий класс формы, содержащий в себе два этапа заполнения формы: 1. тип оплаты и адрес, 2)почта и телефон
class Form implements FormData {
	value: UserData;
	constructor(value: UserData) {}
	getValue(value1: string | null, value2: string | null): UserData {
		return;
	}
	postData(): void {}
	validation(value1: string | null, value2: string | null): boolean {
		return;
	}
	closeModal(): void {}
	continueButton(): void {}
	submitFormButton(): void {}
}

// тип включает в себя возможные id темплейтов
type Templates =
	| '#success'
	| '#card-catalog'
	| '#card-preview'
	| '#card-basket'
	| '#basket'
	| '#order'
	| '#contacts';

// Класс, отвечающий за выведение темплейтов в интерфейс
class ModalContainer {
	item: Templates;
	constructor(item: Templates) {}
	// В зависимости от переданных аргуметов, внутри функции будут вызываться классы, отвечющие за те или иные темплейты и возвращать код для вставки в верстку
	createTemplate(
		item: Templates,
		coast?: number,
		cardData?: object,
		productList?: Array<IProductCard>
	): HTMLElement {
		return;
	}
	pastElement(item: HTMLElement): void {}
	deleteElement(item: HTMLElement): void {}
}

// Класс отвечающий за темплейт '#success'
class SuccessScreen {
	data: Templates;
	coast: number;
	constructor(data: Templates, coast?: number) {}
	createElement(): HTMLElement {
		return;
	}
}

// Класс отвечающий за темплейт '#card-catalog'
class ProductCard {
	data: Templates;
	cardData: object;
	constructor(data: Templates, cardData: object) {}
	createElement(): HTMLElement {
		return;
	}
}

// Класс отвечающий за темплейт '#card-preview'
class ProductCardPreview {
	data: Templates;
	cardData: object;
	constructor(data: Templates, cardData: object) {}
	createElement(): HTMLElement {
		return;
	}
}

// Класс отвечающий за темплейт '#card-basket'
class CardBasket {
	data: Templates;
	productList: Array<IProductCard>;
	constructor(data: Templates, productList: Array<IProductCard>) {}
	createElement(): HTMLElement {
		return;
	}
}

// Класс отвечающий за темплейт '#basket'
class Basket {
	data: Templates;
	productList: Array<IProductCard>;
	constructor(data: Templates, productList: Array<IProductCard>) {}
	createElement(): HTMLElement {
		return;
	}
}

// Класс отвечающий за темплейт '#order'
class Order {
	data: Templates;
	constructor(data: Templates) {}
	createElement(): HTMLElement {
		return;
	}
}

// Класс отвечающий за темплейт '#contacts'
class Contacts {
	data: Templates;
	constructor(data: Templates) {}
	createElement(): HTMLElement {
		return;
	}
}

import { IProductCard } from '../../types';
import { EventEmitter } from '../base/events';
import { FormData } from '../../types';
import { IProduct, IOrder, IBasketModel } from '../../types';

export class BasketModel extends EventEmitter implements IBasketModel {
	protected _items: IProduct[] = [];
	protected _productCard: IProductCard[] = [];

	constructor() {
		super();
	}

	set items(data: IProduct[]) {
		this._items = data;
	}

	get items(): IProduct[] {
		return this._items;
	}

	set itemsForView(product: IProductCard[]) {
		this._productCard = product;
	}

	get itemsForView(): IProductCard[] {
		return this._productCard;
	}

	protected containsProduct(product: IProduct): boolean {
		for (const product_ of this._items) {
			if (product_.id === product.id) return true;
		}
		return false;
	}

	add(product: IProductCard): IProduct | boolean {
		let product_: IProduct = {
			id: product.id,
			title: product.title,
			price: product.price,
		};
		if (!this.containsProduct(product_)) {
			this._items.push(product_);
			this._productCard.push(product);
		}
		return product;
	}

	remove(id: string) {
		this._productCard = this._productCard.filter((item) => item.id !== id);
		this._items = this._items.filter((item) => item.id !== id);
	}

	sendOrder(data: FormData): IOrder {
		this._items = this._items.filter((item) => item.price !== null);
		const id_s = this.items.map((elem) => elem.id);
		const order: IOrder = {
			payment: data.payment,
			email: data.address,
			phone: data.phone,
			address: data.address,
			total: this.countTotal(),
			items: id_s,
		};
		return order;
	}

	countTotal() {
		let total = 0;
		this._items.forEach((elem) => {
			total += elem.price;
		});
		return total;
	}

	cleanOrder(): void {
		this._items = [];
		this.itemsForView = [];
	}
}

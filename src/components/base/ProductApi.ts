import { Api, ApiListResponse } from '../base/api';
import { IProductCard, IProductAPI, IOrder } from '../../types/index';
import { IOrderResult } from '../../types/index';

export interface IProductsAPIConstructor {
	new (cdn: string, baseUrl: string, options?: RequestInit): ProductsAPI;
}

//класс получения данных о продукте с APi
export class ProductsAPI extends Api implements IProductAPI {
	readonly cdn: string;
	readonly baseUrl: string;
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
		this.baseUrl = baseUrl;
	}

	async getProducts(): Promise<IProductCard[]> {
		const data = (await this.get('/product/')) as ApiListResponse<IProductCard>;
		const cards = data.items.map((item) => ({
			...item,
			image: this.cdn + item.image,
		}));
		return cards;
	}

	async postOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order).then((data: IOrderResult) => data);
	}
}

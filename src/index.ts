import './scss/styles.scss';
import { ProductsAPI } from './components/base/ProductApi';
import { Page } from './components/view/Page';
import { ProductView } from './components/view/ProductCards';
import { BasketModel } from './components/model/BasketModel';
import { BasketView } from './components/view/Basket';
import { Form } from './components/view/Form';
import { Presenter } from './components/Presenter';
import { Modal } from './components/view/Modal';

export const basketModel = new BasketModel();

const presenter = new Presenter(
	ProductsAPI,
	basketModel,
	Page,
	ProductView,
	BasketView,
	Form,
	Modal
);

presenter.init();
presenter.renderView();
presenter.renderBasket();

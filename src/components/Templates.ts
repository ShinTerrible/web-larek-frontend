const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;
const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;

export const templatesConfig = {
	successTemplate,
	cardCatalogTemplate,
	cardPreviewTemplate,
	cardBasketTemplate,
	basketTemplate,
	orderTemplate,
	contactsTemplate,
};

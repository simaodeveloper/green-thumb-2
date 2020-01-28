import ProductView from './ProductView';
import ProductController from './ProductController';

export default class ProductControllerAdapter {
  constructor(...parameters) {
    return new ProductController(...parameters, new ProductView());
  }
}

import CatalogView from './CatalogView';
import CatalogController from './CatalogController';

export default class CatalogControllerAdapter {
  constructor(...parameters) {
    return new CatalogController(
      ...parameters,
      new CatalogView()
    );
  }
}

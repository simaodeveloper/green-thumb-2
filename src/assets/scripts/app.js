import steps from './state';

import HomeControllerAdapter from './controllers/Home/HomeControllerAdapter';
import SunControllerAdapter from './controllers/Sun/SunControllerAdapter';
import WaterControllerAdapter from './controllers/Water/WaterControllerAdapter';
import PetsControllerAdapter from './controllers/Pets/PetsControllerAdapter';
import CatalogControllerAdapter from './controllers/Catalog/CatalogControllerAdapter';
import ProductControllerAdapter from './controllers/Product/ProductControllerAdapter';

import Stage from './libraries/Stage';

class Application {
  static start() {
    const stage = new Stage({
      el: '[data-js-stage]',
      steps,
      stepControllers: {
        Home: HomeControllerAdapter,
        Sun: SunControllerAdapter,
        Water: WaterControllerAdapter,
        Pets: PetsControllerAdapter,
        Catalog: CatalogControllerAdapter,
        Product: ProductControllerAdapter,
      },
    });

    stage.start();
  }
}

Application.start();

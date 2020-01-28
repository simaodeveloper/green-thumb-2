import PetsView from './PetsView';
import PetsController from './PetsController';

export default class PetsControllerAdapter {
  constructor(...parameters) {
    return new PetsController(...parameters, new PetsView());
  }
}

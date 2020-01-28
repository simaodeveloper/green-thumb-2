import WaterView from './WaterView';
import WaterController from './WaterController';

export default class WaterControllerAdapter {
  constructor(...parameters) {
    return new WaterController(...parameters, new WaterView());
  }
}

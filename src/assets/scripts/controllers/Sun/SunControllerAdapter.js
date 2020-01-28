import SunView from './SunView';
import SunController from './SunController';

export default class SunControllerAdapter {
  constructor(...parameters) {
    return new SunController(...parameters, new SunView());
  }
}

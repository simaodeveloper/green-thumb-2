import HomeView from './HomeView';
import HomeController from './HomeController';

export default class HomeControllerAdapter {
  constructor(...parameters) {
    return new HomeController(...parameters, new HomeView());
  }
}

import Step from '../../libraries/Step';
import api from '../../API';

import { getClosestElementByClass } from '../../utils';
import { getIconName, prepareProductsToDisplay } from '../_helpers';

export default class CatalogController extends Step {
  constructor(step, steps, stage, view) {
    super(step, steps, stage, view);
    this.loadEvents();
  }

  enter(direction) {
    super.enter(direction);
    this.mountCards();
  }

  mountCards() {
    const params = this.getParamsFromSurvey();

    api.getProductListByParams(params)
      .then(response => this.savePlants(response))
      .then(response => this.transformDataToDisplay(response))
      .then(productList => this.view.getCardsTemplatesMap(productList))
      .then(htmlString => this.view.renderCards(htmlString))
      .then(() => this.view.sliderSetup());
  }

  loadEvents() {
    this.view.ui.catalogList.addEventListener('click', event => {
      const cardButton = getClosestElementByClass(event.target, 'c-card__button');

      if (cardButton) {
        const { plantId } = cardButton.dataset;

        this.stage.next({
          plantId
        })
      }
    });
  }

  transformDataToDisplay(productList) {
    return prepareProductsToDisplay(productList);
  }

  savePlants(response) {
    const state = {...this.step.state};
    state.plants = response;
    this.stage.setCurrentStepState(state);
    return state.plants;

  }

  getParamsFromSurvey() {
    const labels = ['Sun', 'Water', 'Pets'];

    return this.steps
      .filter(step => labels.includes(step.label))
      .reduce((params, step) => {
        let value = step.state.currentValue;
        value = value === null ? undefined : value;
        params[`${step.label.toLowerCase()}Value`] = value ;
        return params;
      }, {});
  }
}

import Step from '../../libraries/Step';
import api from '../../API';

import { prepareProductsToDisplay } from '../_helpers/';
import { getValuesFromFormAsObject } from '../../utils/';

import Validate from '../../libraries/Validate';

export default class ProductController extends Step {
  constructor(step, steps, stage, view) {
    super(step, steps, stage, view);
    this.params = this.stage.getParams(this.step.label);
    this.loadEvents();
  }

  enter(direction) {
    super.enter(direction);
    this.mountProduct();
  }

  loadEvents() {

    Validate.addMethod('fullname', (value, ruleValue) => {
      return value.split(/\s/).length >= 2;
    });

    new Validate({
      form: this.view.ui.form,
      rules: {
        name: {
          required: {
            value: true,
            message: 'This the field name is required!'
          },
          minLength: {
            value: 2,
            message: 'You have to fill at least 2 characters!'
          },
          fullname: {
            value: 2,
            message: 'Please, fill with your fullname!'
          }
        },
        email: {
          required: {
            value: true,
            message: 'This the field email is required!'
          },
          pattern: {
            value: Validate.patterns.email,
            message: 'Please provide a valid e-mail.!'
          }
        }
      },
      options: {
        submitDefault: false
      }
    })
    .on('formSubmit', () => {

      const data = {
        ...getValuesFromFormAsObject(this.view.ui.form),
        id: this.params.plantId
      };

      api.postProduct(data)
        .then(response => this.view.showFormMessage(response))
        .catch(err => console.error(err));

    });
  }

  mountProduct() {

    api.getProductById(this.params.plantId)
      .then(response => this.saveProduct(response))
      .then(response => this.transformDataToDisplay(response))
      .then(products => this.view.getProductTemplateMap(products))
      .then(htmlString => this.view.renderProduct(htmlString))
  }

  transformDataToDisplay(product) {
    return prepareProductsToDisplay([product]);
  }

  saveProduct(response) {
    const state = { ...this.step.state };
    state.product = response;
    this.stage.setCurrentStepState(state);
    return state.product;
  }
}

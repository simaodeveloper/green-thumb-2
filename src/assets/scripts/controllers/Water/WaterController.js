import Step from '../../libraries/Step';
import { optionsHandler } from '../_helpers';

export default class WaterController extends Step {
  constructor(step, steps, stage, view) {
    super(step, steps, stage, view);
    this.loadEvents();
  }

  loadEvents() {
    this.view.ui.options.addEventListener('change', event => {
      const option = event.target;
      optionsHandler(this, option);
    });
  }
}

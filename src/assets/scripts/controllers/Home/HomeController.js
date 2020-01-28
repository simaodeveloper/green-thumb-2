import Step from '../../libraries/Step';

export default class HomeController extends Step {
  constructor(step, steps, stage, view) {
    super(step, steps, stage, view);
    this.init();
  }

  init() {
    const newState = { ...this.step.state };
    newState.started = true;
    this.stage.setCurrentStepState(newState);
  }
}

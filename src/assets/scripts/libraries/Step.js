import { getElements } from '../utils';

export default class Step {
  constructor(step, steps, stage, view) {
    this.step = step;
    this.steps = steps;
    this.stage = stage;
    this.view = view;

    this.view.setElementByLabel(this.step.label);
    this.view.init();
  }

  start() {
    this.view.enter();
  }

  enter(direction) {
    this.view.enter();
  }

  leave(direction) {
    this.view.leave();
  }
}

Step.View = class StepView {
  init() {}

  setElementByLabel(label) {
    this.el = getElements(`[data-step-label="${label}"]`)[0];
  }

  enter() {
    this.el.classList.add('step--is-active');
  }

  leave() {
    this.el.classList.remove('step--is-active');
  }
}

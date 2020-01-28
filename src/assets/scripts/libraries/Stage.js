import { getElements, getClosestElementByAttribute } from '../utils';

export default class Stage {
  constructor({
    el,
    steps = [],
    initialStep = 0,
    stepControllers = {},
    canStart = false,
  }) {
    this.el = getElements(el)[0];
    this.steps = steps;
    this.currentStepIndex = initialStep;
    this.stepControllers = stepControllers;
    this.canStart = canStart;

    this.minIndexStep = 0;
    this.maxIndexStep = this.steps.length - 1;

    this.loadEvents();

    if (this.canStart) this.start();
  }

  loadEvents() {
    /*
      Global controls to handle transitions between each step
    */

    this.el.addEventListener('click', event => {
      const element = getClosestElementByAttribute(
        event.target,
        'data-stage-command'
      );

      if (element) {
        const commands = element.dataset;
        this[commands.stageCommand]();
      }
    });
  }

  hasPrevStep() {
    return this.currentStepIndex > this.minIndexStep;
  }

  prev(params) {
    this.getCurrentStepInstance(params).leave('prev');

    if (!this.hasPrevStep()) {
      return false;
    }

    this.currentStepIndex -= 1;

    this.getCurrentStepInstance(params).enter('prev');

    return this;
  }

  hasNextStep() {
    return this.currentStepIndex < this.maxIndexStep;
  }

  next(params) {
    this.getCurrentStepInstance(params).leave('next');

    if (!this.hasNextStep()) {
      return false;
    }

    this.currentStepIndex += 1;

    this.getCurrentStepInstance(params).enter('next');

    return this;
  }

  start(params) {
    const stepInstance = this.getCurrentStepInstance(params);

    if ('start' in stepInstance) {
      stepInstance.start();
    }
  }

  getCurrentStepInstance(params) {
    const step = this.getCurrentStep();
    const Controller = this.getControllerBylabel(step.label);

    this.setParams(step.label, params);

    if (!this.stepsInstances) {
      this.stepsInstances = {};
    }

    if (!(step.label in this.stepsInstances)) {
      this.stepsInstances[step.label] = new Controller(step, this.steps, this);
    }

    this.deleteParams(step.label);

    return this.stepsInstances[step.label];
  }

  setParams(label, params) {
    if (!this.storeParams) {
      this.storeParams = {};
    }

    this.storeParams[label] = params;
  }

  getParams(label) {
    return this.storeParams[label];
  }

  deleteParams(label) {
    delete this.storeParams[label];
  }

  getCurrentStep() {
    return this.steps[this.currentStepIndex];
  }

  getControllerBylabel(label) {
    return this.stepControllers[label];
  }

  setCurrentStepState(newState) {
    this.steps[this.currentStepIndex].state = { ...newState };
  }

  getStepByLabel(label) {
    return this.steps.find(step => step.label === label);
  }
}

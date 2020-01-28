import Emitter from './Emitter';

import { isObjectEmpty, getElements } from '../utils';

const globalOptions = {
  classErrorElement: 'validate--error',
  classErrorMessage: 'validate--message-error',
  tagErrorMessage: 'span',
  submitDefault: true,
};

const createElementErrorMessage = ({
  tagErrorMessage,
  classErrorMessage,
  message
}) => {
  return `
    <${tagErrorMessage} class="${classErrorMessage}">
      <svg class="o-icon o-icon--micro"><use xlink:href="images/icons.svg#svg-exclamation-circle-solid"/></svg>
      <span class="${classErrorMessage}-text">${message}</span>
    </${tagErrorMessage}>`
};

export default class Validate extends Emitter {
  constructor({ form, rules, options}) {
    super();
    this.form = form;
    this.rules = rules;
    this.options = {...globalOptions, ...options};

    this.setCoreEvents();
  }

  static addMethod(methodName, fn) {
    this.methods[methodName] = fn;
  }

  setCoreEvents() {

    this.on('error', (element, error) => {
      const parent = element.parentNode;

      parent.classList.add(this.options.classErrorElement);

      parent.insertAdjacentHTML('beforeend',
        createElementErrorMessage({
          tagErrorMessage: this.options.tagErrorMessage,
          classErrorMessage: this.options.classErrorMessage,
          message: error
        })
      );
    });

    this.on('valid', element => {
      const parent = element.parentNode;

      parent.classList.remove(this.options.classErrorElement);

      this.removeMessageError(parent);
    });

    this.on('formSubmit', elements => {});

    this.form.addEventListener('submit', event => {
      event.preventDefault();

      this.validate();

      if (this.isValid()) {
        this.dispatch('formSubmit');
      }
    });
  }

  isValid() {
    const ruleNames = Object.keys(this.rules);
    return ruleNames.every(name => this.rules[name].isValid);
  }

  removeMessageError(context) {
    const errorMessages = getElements(`.${this.options.classErrorMessage}`, context);

    if (errorMessages && errorMessages.length > 0) {
      errorMessages.forEach(messageEl => messageEl.remove());
    }
  }

  getFieldName(element) {
    return element.getAttribute('name');
  }

  getFields() {
    return Array.from(this.form.elements);
  }

  getFieldByName(name) {
    return this.getFields().find(element => this.getFieldName(element) === name);
  }

  getRuleByName(name) {
    return this.rules[name];
  }

  validate() {
    const elements = this.getFields();

    if (isObjectEmpty(this.rules)) {
      throw new Error('Please you have to insert some rules to validate the form!');
    }

    Object.keys(this.rules).forEach(ruleName => {
      const element = this.getFieldByName(ruleName);
      const rule = this.getRuleByName(ruleName);

      this.executeRuleTest(rule, element);
    });
  }

  validateByElement(element) {
    const name = this.getFieldName(element);
  }

  validateByName(name) {
    const rule = this.getRuleByName(name);
    const field = getFieldByName(name);
  }

  executeRuleTest(rule, element) {
    const ruleValidators = this.getValidatorsByRule(rule);

    this.removeMessageError(element.parentNode);

    for (let ruleName in ruleValidators) {

      if (!rule.isValid !== undefined) {
        Object.defineProperty(rule, 'isValid', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: true
        });
      }

      let test = ruleValidators.methods[ruleName];

      if (test(element.value, rule[ruleName].value)) {
        rule.isValid = true;
        this.dispatch('valid', element);
      } else {
        rule.isValid = false;
        this.dispatch('error', element, rule[ruleName].message);
      }
    }
  }

  getValidatorsByRule(rule) {
    const newRule = { ...rule};
    const methodNames = Object.keys(newRule);

    if (!newRule.methods) {
      Object.defineProperty(newRule, 'methods', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: {}
      });
    }

    methodNames.forEach(name => {
      if (!newRule.methods[name]) {
        newRule.methods[name] = Validate.methods[name];
      }
    });

    return newRule;
  }
}

Validate.patterns = {
  email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
};

Validate.methods = {
  minLength: (value, ruleValue) => {
    return value.length >= ruleValue;
  },
  required: (value, ruleValue) => {
    return value.length > 0;
  },
  pattern: (value, ruleValue) => {
    return ruleValue.test(value);
  }
};

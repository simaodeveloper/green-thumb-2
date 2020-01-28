import { getClosestElementByClass } from '../../utils';

export const optionsHandler = (context, option) => {
  if (context.step.state.values.includes(option.value)) {
    const state = { ...context.step.state };
    state.currentValue = option.value;
    context.stage.setCurrentStepState(state);
    context.view.setOptionActive(option);
  }
}

export const optionActiveHandler = (context, optionInput) => {
  const ACTIVE_CLASS = 'is--activated';
  const optionItem = getClosestElementByClass(optionInput, 'c-options__item');

  context.ui.optionItems.forEach(option => option.classList.remove(ACTIVE_CLASS));
  optionItem.classList.add(ACTIVE_CLASS);
}

export const getIconName = value => {
  // Just for Toxicity
  const stringValue = value.toString() === 'false' ? 'no' : value.toString();

  return {
    'high': {
      icon: 'high-sun',
      text: 'High sunlight'
    },
    'low': {
      icon: 'low-sun',
      text: 'Low sunlight'
    },
    'daily': {
      icon: 'three-drops',
      text: 'Water daily'
    },
    'regularly': {
      icon: 'two-drops',
      text: 'Water regularly'
    },
    'rarely': {
      icon: 'one-drop',
      text: 'Water rarely'
    },
    'no': {
      icon: 'toxic',
      text: '<em class="t-text--bold">Beware!</em> Toxic for pets'
    },
    'true': {
      icon: 'pet',
      text: 'Non-toxic for pets'
    }
  }[stringValue];
}

export const prepareProductsToDisplay = productList =>
  productList.map(({ id, name, url, price, sun, water, toxicity }) => {
    const warnings = [sun, water, toxicity].map(value => getIconName(value));

    return {
      id,
      name,
      url,
      price,
      warnings,
      alt: name,
    };
  });

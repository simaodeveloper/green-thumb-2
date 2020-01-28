export const getElements = (selector, context = document) =>
  Array.from(context.querySelectorAll(selector));

export const getClosestElementByClass = (
  element,
  className,
  rootElememt = document
) => {
  if (element === rootElememt) return null;
  return element.classList.contains(className)
    ? element
    : getClosestElementByClass(element.parentNode, className);
};

export const getClosestElementByAttribute = (
  element,
  attribute,
  rootElememt = document
) => {
  if (element === rootElememt) return null;
  return element.hasAttribute(attribute)
    ? element
    : getClosestElementByAttribute(element.parentNode, attribute);
};

export const renderDOM = (htmlString, target) => {
  target.innerHTML = htmlString;
};

export const stripTags = str => str.replace(/<\/?.+>/g, '').trim();

export const breakLineByIndex = (str, index = 1, tag = '<br />') => {
  const strSplited = str.split(/\s/g);
  return strSplited
    .slice(0, index)
    .concat(tag, strSplited.slice(index))
    .join(' ');
};

export const isObjectEmpty = obj => Object.keys(obj).length === 0;

export const getValuesFromFormAsObject = form =>
  Array.from(form.elements).reduce((obj, element) => {
    if (element.nodeName !== 'BUTTON') {
      obj[element.getAttribute('name')] = element.value;
    }
    return obj;
  }, {});

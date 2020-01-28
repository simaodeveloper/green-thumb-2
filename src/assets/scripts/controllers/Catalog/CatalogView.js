import Step from '../../libraries/Step';

import IsMobile from '../../libraries/IsMobile';

import {
  getElements,
  renderDOM,
  stripTags
} from '../../utils';

export default class CatalogView extends Step.View {
  init() {
    this.ui = {
      catalogList: getElements('[ref="catalog-list"]')[0],
    }
  }

  getCardTemplate({
    id,
    url,
    name,
    price,
    warnings
  }) {
    return `
      <article class="c-card o-catalog__grid__item">
        <div class="c-card__container">
          <figure class="c-card__figure">
            <img src="${url}" alt="" class="c-card__image">
          </figure>
          <h3 class="c-card__title t-text--bold">${name}</h3>
          <div class="c-card__wrap">
            <div class="c-card__price t-text--light">$${price}</div>
            <ul class="c-card__warnings">
              ${
                warnings.map(warning => `
                  <li class="c-card__warnings__item o-icon--${warning.icon}" title="${stripTags(warning.text)}">
                    <svg class="o-icon o-icon--fluid"><use xlink:href="images/icons.svg#svg-${warning.icon}" /></svg>
                  </li>
                `).join('')
              }
            </ul>
          </div>
          <button class="c-btn c-btn--default c-btn--full c-card__button" data-plant-id="${id}">buy now</button>
        </div>
      </article>
    `;
  }

  getCardsTemplatesMap(productList) {
    return productList.map(product => this.getCardTemplate(product)).join('');
  }

  renderCards(htmlString) {
    renderDOM(htmlString, this.ui.catalogList);
  }

  sliderSetup() {
    if (IsMobile.ANY()) {
      const sliderEl = document.querySelector('[data-js-slider]');

      const {
        jsSliderWidthUnit: widthUnit,
        jsSliderSpaceBetween: spaceBetween
      } = sliderEl.dataset;

      const childrenLength = sliderEl.children.length;

      const sliderWidth = (Number(widthUnit) + Number(spaceBetween)) * childrenLength;

      sliderEl.style.width = `${sliderWidth}px`;
    }
  }
}

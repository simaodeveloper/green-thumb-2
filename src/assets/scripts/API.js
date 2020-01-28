import http from './libraries/HTTP';
import * as config from './config';

class API {
  constructor(httpClient, baseUrl) {
    this.http = httpClient;
    this.baseUrl = baseUrl;
  }

  getProductListByParams({
    sunValue = 'high',
    waterValue = 'rarely',
    petsValue = 'false',
  }) {
    return this.http
      .get({
        url: `${this.baseUrl}/?sun=${sunValue}&water=${waterValue}&pets=${petsValue}`,
      })
      .catch(err => console.error(err));
  }

  getProductById(id = 1) {
    return this.http
      .get({
        url: `${this.baseUrl}/plant?id=${id}`,
      })
      .catch(err => console.error(err));
  }

  postProduct(data) {
    return this.http
      .post({
        url: this.baseUrl,
        body: JSON.stringify(data),
      })
      .catch(err => console.error(err));
  }
}

export default new API(http, config.API_URL);

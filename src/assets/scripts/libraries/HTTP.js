export default class HTTP {
  static request(options) {
    let settings = {
      headers: {
        Accept: 'application/json',
      },
      mode: 'cors',
      cache: 'default',
    };

    settings = { ...settings, ...options };

    return fetch(settings.url, settings).then(response => response.json());
  }

  static get(options) {
    return this.request(options);
  }

  static post(options) {
    const settings = {
      ...options,
      method: 'POST',
    };

    return this.request(settings);
  }
}

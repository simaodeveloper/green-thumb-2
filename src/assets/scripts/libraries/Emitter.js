export default class Emitter {
  constructor() {
    this.events = {};
  }

  on(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(fn);

    return this;
  }

  once(event, fn) {
    function fnOnce(...args) {
      fn(...args);
      this.off(event, fnOnce);
    }

    this.on(event, fnOnce);
  }

  off(event, fn) {
    if (!this.events[event]) {
      throw new Error('This event dont exist!');
    }

    if (!this.events[event].includes(fn)) {
      throw new Error('This listener is not defined!');
    }

    const fnIndex = this.events[event].indexOf(fn);
    const events = [...this.events[event]];

    events.splice(fnIndex, 1);
    this.events[event] = events;

    return true;
  }

  dispatch(event, ...args) {
    if (!this.events[event]) {
      throw new Error('This event dont exist!');
    }

    this.events[event].forEach(fn => fn(...args));
  }
}

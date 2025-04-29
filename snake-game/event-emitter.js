class EventEmitter {
  listeners = {};

  on(event, action) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(action)
  }

  emit(event, params) {
    this.listeners[event].forEach(callback => callback(params));
  }
}
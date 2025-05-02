class KeyboardListener {
  actionsQueue = [];
  
  startListening(ignoreSameConsecutiveInput = false) {
    document.addEventListener('keydown', (event) => {
      if (!ignoreSameConsecutiveInput || this.actionsQueue[this.actionsQueue.length - 1] != event.key) {
        this.actionsQueue.push(event.key);
      }
    });
  }

  consumeQueue() {
    return this.actionsQueue.shift();
  }
}
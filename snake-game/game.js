class Game {
  tabuleiro;
  gameRun;
  speed = 1;
  stepObservers = [];

  constructor(tabuleiro) {
    this.tabuleiro = tabuleiro;
  }

  start() {
    this.tabuleiro.start();
    this.gameRun = setInterval(() => {
      this.step();
    }, 200 / this.speed)
  }

  endGame() {
    alert('Game Over');
    // history.go(0);
    clearInterval(this.gameRun);
  }

  step() {
    this.tabuleiro.jogador.atualizarPosicao();
    if (this.tabuleiro.isJogadorTocouBorda()) {
      this.endGame();
      return;
    }

    if (this.tabuleiro.matriz[this.tabuleiro.jogador.head.y][this.tabuleiro.jogador.head.x]) {
      const collidedObject = this.tabuleiro.matriz[this.tabuleiro.jogador.head.y][this.tabuleiro.jogador.head.x];
      if (collidedObject.constructor.name == 'Fruta') {
        this.tabuleiro.jogador.comer();
        this.tabuleiro.frutas = this.tabuleiro.frutas.filter(fruta => fruta.x != collidedObject.x || fruta.y != collidedObject.y);

        this.tabuleiro.spawnFruta();
      } else if (collidedObject.constructor.name == 'NoCauda') {
        this.endGame();
      }
    }

    if (this.tabuleiro.frutas.length == 0) {
      this.tabuleiro.spawnFrutas();
    }

    this.tabuleiro.resetMatriz();
    this.tabuleiro.loadObjectsToMatriz();

    this.notifyAll(this.stepObservers);
  }

  addStepObserver(observer) {
    this.stepObservers.push(observer)
  }

  notifyAll(observers) {
    observers.forEach(observer => observer.update());
  }

  isRunning() {
    return this.gameRun != null;
  }
}
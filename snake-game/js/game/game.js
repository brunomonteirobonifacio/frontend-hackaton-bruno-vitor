const GameStatus = {
  NOT_STARTED: 'NOT_STARTED',
  RUNNING: 'RUNNING',
  GAME_OVER: 'GAME_OVER'
}

class Game extends EventEmitter {
  tabuleiro;
  highScore;
  score;
  status = GameStatus.NOT_STARTED;

  constructor(tabuleiro) {
    super();
    this.tabuleiro = tabuleiro;
  }

  setup() {
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('highScore') ?? 0)
    this.tabuleiro.start();
  }

  start() {
    this.status = GameStatus.RUNNING;
  }

  endGame() {
    this.status = GameStatus.GAME_OVER;

    if (this.highScore < this.score) {
      localStorage.setItem('highScore', this.score)
      this.highScore = this.score;
      
      if (Notification.permission == 'granted') {
        new Notification(`Novo recorde alcançado! ${this.highScore}pts`)
      }
    }
  }

  reset() {
    this.setup();
    this.start();
  }

  update() {
    if (this.status == GameStatus.RUNNING) {
      this.step();
      this.emit('update');
    }
  }

  step() {
    this.tabuleiro.jogador.atualizarPosicao();
    if (this.tabuleiro.isJogadorColidiuBorda() || this.tabuleiro.isJogadorColidiuCauda()) {
      this.endGame();
      return;
    }

    const collidedFruta = this.tabuleiro.getFrutaJogadorColidiu();
    if (collidedFruta) {
      this.tabuleiro.jogador.crescer();
      this.score += 1

      this.tabuleiro.removeFruta(collidedFruta)
    }

    if (this.tabuleiro.frutas.length == 0) {
      this.tabuleiro.spawnFrutas();
    }

    this.tabuleiro.spawnFrutaRandomBasedOnQtdeFrutasAtual();

    this.tabuleiro.resetMatriz();
    this.tabuleiro.loadObjectsToMatriz();
  }
}
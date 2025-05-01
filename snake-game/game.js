class Game extends EventEmitter {
  tabuleiro;
  gameRun;
  highScore;
  score;
  speed = 1;

  constructor(tabuleiro) {
    super();
    this.tabuleiro = tabuleiro;
  }

  setup() {
    this.score = 0;
    this.highScore = parseInt(sessionStorage.getItem('highScore') ?? 0)
    this.tabuleiro.start();
  }

  endGame() {
    if (this.highScore < this.score) {
      sessionStorage.setItem('highScore', this.score)
    }

    this.emit('gameOver');
  }

  step() {
    this.tabuleiro.jogador.atualizarPosicao();
    if (this.tabuleiro.isJogadorTocouBorda()) {
      this.endGame();
      return;
    }

    // TODO: melhorar para fazer as verificações necessárias na clase tabuleiro
    if (this.tabuleiro.matriz[this.tabuleiro.jogador.head.y][this.tabuleiro.jogador.head.x]) {
      const collidedObject = this.tabuleiro.matriz[this.tabuleiro.jogador.head.y][this.tabuleiro.jogador.head.x];
      if (collidedObject.constructor.name == 'Fruta') {
        this.tabuleiro.jogador.comer();
        this.score += 1
        this.tabuleiro.frutas = this.tabuleiro.frutas.filter(fruta => fruta.x != collidedObject.x || fruta.y != collidedObject.y);

        this.tabuleiro.spawnFruta();
      } else if (this.tabuleiro.jogador.direcao && collidedObject.constructor.name == 'NoCauda') {
        this.endGame();
      }
    }

    if (this.tabuleiro.frutas.length == 0) {
      this.tabuleiro.spawnFrutas();
    }

    this.tabuleiro.resetMatriz();
    this.tabuleiro.loadObjectsToMatriz();
  }
}

class GameLoop {
  game;
  renderer;
  speed = 1;
  gameRun;

  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;

    game.on('gameOver', () => this.endGame());
  }

  bootstrap() {
    this.game.setup();

    if (!this.gameRun) {
      this.gameRun = setInterval(() => {
        this.game.update();
    this.renderer.render();
      }, 200 / this.speed);
    }
  }

  start() {
    this.gameRun = setInterval(() => {
      this.game.step();
      this.renderer.render();
    }, 200 / this.speed);

    this.observeTeclado(this.game);
  }

  endGame() {
    alert('Game Over'); // placeholder
  }

  observeTeclado(game) {
    document.addEventListener('keydown', (event) => {
      const tecladoAction = TECLADO_ACTIONS[event.key];
  
      if (tecladoAction) {
        tecladoAction(game);
      }
    })
  }

  isRunning() {
    return this.gameRun != null;
  }
}

const TECLADO_ACTIONS = {
  ArrowRight: (game) => {
    game.tabuleiro.jogador.mudarDirecao(Direcoes.DIREITA);
  },
  ArrowLeft: (game) => {
    game.tabuleiro.jogador.mudarDirecao(Direcoes.ESQUERDA);
  },
  ArrowUp: (game) => {
    game.tabuleiro.jogador.mudarDirecao(Direcoes.CIMA);
  },
  ArrowDown: (game) => {
    game.tabuleiro.jogador.mudarDirecao(Direcoes.BAIXO);
  }
}
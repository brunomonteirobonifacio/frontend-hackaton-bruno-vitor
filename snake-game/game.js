class Game extends EventEmitter {
  tabuleiro;
  gameRun;
  speed = 1;

  constructor(tabuleiro) {
    super();
    this.tabuleiro = tabuleiro;
  }

  setup() {
    this.tabuleiro.start();
  }

  endGame() {
    this.emit('gameOver');
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
  }

  isRunning() {
    return this.gameRun != null;
  }
}

class GameLoop {
  game;
  renderer;
  speed = 1;

  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;

    game.on('gameOver', () => this.endGame());
  }

  bootstrap() {
    this.game.setup();
    this.renderer.render();
  }

  start() {
    this.gameRun = setInterval(() => {
      this.game.step();
      this.renderer.render();
    }, 200 / this.speed);

    this.observeTeclado(this.game);
  }

  endGame() {
    alert('Game Over');
    clearInterval(this.gameRun);
    history.go(0);
  }

  observeTeclado(game) {
    document.addEventListener('keydown', (event) => {
      const tecladoAction = TECLADO_ACTIONS[event.key];
  
      if (tecladoAction) {
        tecladoAction(game);
      }
    })
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
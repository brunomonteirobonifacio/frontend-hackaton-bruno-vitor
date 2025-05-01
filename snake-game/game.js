const GameStatus = {
  NOT_STARTED: 'NOT_STARTED',
  RUNNING: 'RUNNING',
  GAME_OVER: 'GAME_OVER'
}

class Game extends EventEmitter {
  tabuleiro;
  gameRun;
  highScore;
  score;
  status = GameStatus.NOT_STARTED;

  constructor(tabuleiro) {
    super();
    this.tabuleiro = tabuleiro;
  }

  setup() {
    this.score = 0;
    this.highScore = parseInt(sessionStorage.getItem('highScore') ?? 0)
    this.tabuleiro.start();
  }

  start() {
    this.status = GameStatus.RUNNING;
  }

  endGame() {
    this.status = GameStatus.GAME_OVER;

    if (this.highScore < this.score) {
      sessionStorage.setItem('highScore', this.score)
      this.highScore = this.score;
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
      this.tabuleiro.jogador.comer();
      this.score += 1

      this.tabuleiro.removeFruta(collidedFruta)
      this.tabuleiro.spawnFruta();
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

    this.game.on('update', () => {
      if (this.game.status == GameStatus.GAME_OVER) {
        this.endGame();
      }
    });

    this.renderer = renderer;
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
    this.observeTeclado(this.game);
    this.game.start();
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
class GameLoop {
  game;
  renderer;
  incrementSpeed = 0;
  gameRun;
  incrementSpeedStrategy = IncrementSpeedStrategies.DONT_INCREMENT;

  constructor(game, renderer) {
    this.game = game;
    this.renderer = renderer;
  }

  bootstrap() {
    this.game.setup();

    if (!this.gameRun) {
      this.startGameRun();
    }
  }

  start() {
    this.incrementSpeed = 0;
    this.game.setup();
    this.game.start();

    if (this.incrementSpeedStrategy) {
      this.incrementSpeedStrategy.apply(this)
    }
  }

  startGameRun() {
    this.gameRun = setTimeout(() => {
      this.game.update();
      this.renderer.render();

      this.startGameRun();
    }, 200 / (1 + this.incrementSpeed));
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
    });
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
};

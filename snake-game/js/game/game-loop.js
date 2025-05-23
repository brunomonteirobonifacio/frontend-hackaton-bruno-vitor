class GameLoop {
  game;
  renderer;
  incrementSpeed = 0;
  gameRun;
  keyboardListener;
  incrementSpeedStrategy = IncrementSpeedStrategies.DONT_INCREMENT;

  constructor(game, keyboardListener, renderer) {
    this.game = game;
    this.renderer = renderer;
    this.keyboardListener = keyboardListener;

    const cachedIncrementSpeedStrategy = sessionStorage.getItem('incrementSpeedStrategy');
    if (cachedIncrementSpeedStrategy) {
      this.incrementSpeedStrategy = IncrementSpeedStrategies[cachedIncrementSpeedStrategy]
    }
  }

  bootstrap() {
    this.game.setup();

    if (!this.gameRun) {
      this.startGameRun();
    }
  }

  start() {
    this.keyboardListener.startListening(true);
    this.incrementSpeed = 0;
    this.game.setup();
    this.game.start();

    if (this.incrementSpeedStrategy) {
      this.incrementSpeedStrategy.apply(this)
    }
  }

  startGameRun() {
    this.gameRun = setTimeout(() => {
      this.processUserInput();
      this.game.update();
      this.renderer.render();

      this.startGameRun();
    }, 200 / (1 + this.incrementSpeed));
  }

  async processUserInput() {
    const keyPressed = this.keyboardListener.consumeQueue();

    const keyboardAction = TECLADO_ACTIONS[keyPressed];
    if (keyboardAction) {
      keyboardAction(this.game);
    };
  }

  changeIncrementSpeedStrategy(incrementSpeedStrategyName) {
    this.incrementSpeedStrategy = IncrementSpeedStrategies[incrementSpeedStrategyName];
    sessionStorage.setItem('incrementSpeedStrategy', incrementSpeedStrategyName)
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

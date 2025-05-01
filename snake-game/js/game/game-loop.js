class GameLoop {
  game;
  renderer;
  speed = 1;
  gameRun;

  constructor(game, renderer) {
    this.game = game;
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

const SCALE = 15;

function init() {
  const tabuleiroCanvas = document.getElementById('game-board');
  
  const tabuleiro = new Tabuleiro(tabuleiroCanvas, SCALE);
  const jogador = new Jogador(5, 5);
  tabuleiro.jogador = jogador;
  
  const renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  const game = new Game(tabuleiro);
  game.addStepObserver(renderer);
  
  observeTeclado(game);
  console.log(Direcoes.ESQUERDA.isOposta(Direcoes.DIREITA))
}

function observeTeclado(game) {
  document.addEventListener('keydown', (event) => {
    const tecladoAction = TECLADO_ACTIONS[event.key];

    if (tecladoAction) {
      tecladoAction(game);

      if (!game.isRunning()) {
        game.start();
      }
    }
  })
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

init();
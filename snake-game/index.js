const SCALE = 15;

function init() {
  const tabuleiroCanvas = document.getElementById('game-board');
  
  const tabuleiro = new Tabuleiro(tabuleiroCanvas, SCALE);
  tabuleiro.jogador = new Jogador(5, 5);
  
  const renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  const gameLoop = new GameLoop(new Game(tabuleiro), renderer);

  gameLoop.bootstrap();
  gameLoop.start();
}

init();
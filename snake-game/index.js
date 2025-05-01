const SCALE = 15;
const tabuleiroCanvas = document.getElementById('game-board');
let tabuleiro;
let renderer;
let gameLoop;

function init() {
  tabuleiro = new Tabuleiro(tabuleiroCanvas, SCALE);
  tabuleiro.jogador = new Jogador(5, 5);
  
  renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  gameLoop = new GameLoop(new Game(tabuleiro), renderer);
  gameLoop.bootstrap();
  
  startGame();
}

function startGame() {
  gameLoop.start();
}

init();

document.getElementById('start-game-btn').addEventListener('click', startGame)
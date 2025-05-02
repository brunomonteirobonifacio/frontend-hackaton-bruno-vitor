const SCALE = 15;
const tabuleiroCanvas = document.getElementById('game-board');
let tabuleiro;
let renderer;
let gameLoop;
let game;

function init() {
  tabuleiro = new Tabuleiro(tabuleiroCanvas, SCALE);
  tabuleiro.jogador = new Jogador(5, 5);
  
  renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  game = new Game(tabuleiro);
  gameLoop = new GameLoop(game, new KeyboardListener(), renderer);
  gameLoop.incrementSpeedStrategy = IncrementSpeedStrategies.BY_TAIL_LENGTH;

  // TODO: verificar se esse é realmente o melhor lugar para deixar isso
  game.on('update', () => {
    if (game.status == GameStatus.GAME_OVER) {
      gameLoop.endGame();
    }
  });

  game.on('update', upadateScoreboard)
  
  gameLoop.bootstrap();
  
  startGame();
}

function startGame() {
  gameLoop.start();
}

function upadateScoreboard() {
  const score = game.score;
  const highScore = game.highScore;
  document.getElementById('score').textContent = score;
  document.getElementById('high-score').textContent = highScore;
}

init();

document.getElementById('start-game-btn').addEventListener('click', startGame)
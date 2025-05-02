const SCALE = 15;
const tabuleiroCanvas = document.getElementById('game-board');
let tabuleiro;
let renderer;
let gameLoop;
let game;
let playMusic = true;

function init() {
  tabuleiro = new Tabuleiro(tabuleiroCanvas, SCALE);
  tabuleiro.jogador = new Jogador(5, 5);
  
  renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  game = new Game(tabuleiro);
  gameLoop = new GameLoop(game, new KeyboardListener(), renderer);
  gameLoop.incrementSpeedStrategy = IncrementSpeedStrategies.BY_SCORE;

  game.on('update', () => {
    if (game.status == GameStatus.GAME_OVER) {
      gameLoop.endGame();
    }
  });

  game.on('update', upadateScoreboard)
  game.on('comeu', () => document.getElementById('som-cobrinha-comeu').play())
  gameLoop.bootstrap();

  window.Notification.requestPermission();
  
  startGame();
}

function startGame() {
  if (playMusic) {
    const audio = document.getElementById('musica-fundo');
    audio.volume = 0.2;
    audio.currentTime = 0;
    audio.play();
  }
  gameLoop.start();
}

function upadatePlacar() {
  const score = game.score;
  const highScore = game.highScore;
  document.getElementById('score').textContent = score;
  document.getElementById('high-score').textContent = highScore;
}

function toggleMusica() {
  const audio = document.getElementById('musica-fundo');

  if (audio.paused) {
    audio.volume = 0.2;
    audio.play();
  } else {
    audio.pause();
  }

  playMusic = !playMusic;
}

init();

document.getElementById('start-game-btn').addEventListener('click', startGame)
document.getElementById('increment-speed-strategy-selector').addEventListener('change', (event) => gameLoop.incrementSpeedStrategy = IncrementSpeedStrategies[event.target.value])
document.getElementById('toggle-musica').addEventListener('click', toggleMusica);
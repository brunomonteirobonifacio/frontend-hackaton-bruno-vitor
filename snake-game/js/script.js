const SCALE = 15;
const tabuleiroCanvas = document.getElementById('game-board');
let tabuleiro;
let renderer;
let gameLoop;
let game;
let playMusic = true;

function init() {
  tabuleiro = new Tabuleiro(tabuleiroCanvas.clientWidth, tabuleiroCanvas.clientHeight, SCALE);
  tabuleiro.jogador = new Jogador(5, 5);
  
  renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  game = new Game(tabuleiro);
  gameLoop = new GameLoop(game, new KeyboardListener(), renderer);

  game.on('update', () => {
    upadatePlacar();

    if (game.status == GameStatus.GAME_OVER) {
      // TODO: MOSTRAR TELA DE GAME OVER (verificar se vai ser setado aqui ou em Game)
      const audioGameOver = document.getElementById('game-over');
      const audioMusica = document.getElementById('musica-fundo');
      
      if (!audioMusica.paused || !audioMusica.ended) {
        audioMusica.pause();
        audioMusica.currentTime = 0;
      }
      
      audioGameOver.play();
    }
  })

  game.on('comeu', () => {
    const audio = document.getElementById('som-cobrinha-comeu');
    audio.volume = 0.5

    if (!audio.paused && !audio.ended) {
      audio.currentTime = 0;
    }
    audio.play();
  })
  gameLoop.bootstrap();

  window.Notification.requestPermission();
  
  startGame();
}

function startGame() {
  if (playMusic) {
    window.onkeydown = () => {
      const audio = document.getElementById('musica-fundo');
      audio.volume = 0.2;
      
      audio.play();
    }
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
  audio.volume = 0.2;

  if (audio.paused || audio.ended) {
    audio.play();
  } else {
    audio.pause();
  }

  playMusic = !playMusic;
}

init();

document.getElementById('start-game-btn').addEventListener('click', startGame)
document.getElementById('increment-speed-strategy-selector').addEventListener('change', (event) => gameLoop.incrementSpeedStrategy = IncrementSpeedStrategies[event.target.value])
document.getElementById('toggle-musica').addEventListener('click', event => {
  toggleMusica();
  event.target.textContent = playMusic ? 'DESLIGAR MUSICA' : 'LIGAR MUSICA';
});
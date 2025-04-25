const WIDTH_TABULEIRO = 128;
const HEIGHT_TABULEIRO = 128;

function init() {
  const tabuleiroCanvas = document.getElementById('game-board');
  
  const jogador = new Jogador(5, 5);
  const tabuleiro = new Tabuleiro(WIDTH_TABULEIRO, HEIGHT_TABULEIRO);
  const renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.scale = 10
  renderer.step = 10

  tabuleiro.jogador = jogador;
  tabuleiro.start();
  renderer.render();
  
  observeTeclado(tabuleiro, renderer);
}

function observeTeclado(tabuleiro, renderer) {
  document.addEventListener('keydown', (event) => {
    const moveX = (event.key == 'ArrowRight') - (event.key == 'ArrowLeft');
    const moveY = (event.key == 'ArrowDown') - (event.key == 'ArrowUp');

    tabuleiro.atualizarPosicaoJogador(tabuleiro.jogador.head.x + moveX, tabuleiro.jogador.head.y + moveY);
    renderer.render();    
  })
}

init();
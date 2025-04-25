const SCALE = 15;

function init() {
  const tabuleiroCanvas = document.getElementById('game-board');
  
  const jogador = new Jogador(5, 5);
  const tabuleiro = new Tabuleiro(tabuleiroCanvas, scale);
  const renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

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
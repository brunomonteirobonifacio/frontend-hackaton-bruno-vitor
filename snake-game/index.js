const SCALE = 15;

function init() {
  const tabuleiroCanvas = document.getElementById('game-board');
  
  const jogador = new Jogador(5, 5);
  const tabuleiro = new Tabuleiro(tabuleiroCanvas, SCALE);
  const renderer = new Renderer(tabuleiro, tabuleiroCanvas);
  renderer.setScale(SCALE);

  tabuleiro.jogador = jogador;
  tabuleiro.start();
  setInterval(() => tabuleiro.step(), 1000)
  renderer.render();
  
  observeTeclado(tabuleiro, renderer);
}

function observeTeclado(tabuleiro, renderer) {
  document.addEventListener('keydown', (event) => {
    const moveX = (event.key == 'ArrowRight') - (event.key == 'ArrowLeft');
    const moveY = (event.key == 'ArrowDown') - (event.key == 'ArrowUp');

    if (moveX || moveY) {
      tabuleiro.atualizarPosicaoJogador(tabuleiro.jogador.head.x + moveX, tabuleiro.jogador.head.y + moveY);

    }
    renderer.render();    
  })
}

init();
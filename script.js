const MEDIDA_TO_PIXEL = 5;
const WIDTH_TABULEIRO = 128;
const HEIGHT_TABULEIRO = 128;

class NoCauda {
  x;
  y;
  canvasContext;
  anterior;

  constructor(x, y, canvasContext) {
    this.x = x;
    this.y = y;
    this.canvasContext = canvasContext;
    this.anterior = null;
  }

  atualizarPosicao(x, y) {
    let oldX = this.x;
    let oldY = this.y;

    this.x = x;
    this.y = y;

    this.render(oldX, oldY)

    if (this.anterior) {
      this.anterior.atualizarPosicao(oldX, oldY)
    }
  }

  render(oldX, oldY) {
    this.canvasContext.fillStyle = 'green';
    this.canvasContext.clearRect(oldX, oldY, MEDIDA_TO_PIXEL, MEDIDA_TO_PIXEL)
    this.canvasContext.fillRect(this.x, this.y, MEDIDA_TO_PIXEL, MEDIDA_TO_PIXEL);
  }

  addNo() {
    if (this.anterior) {
      this.anterior.addNo();
      return;
    }

    this.anterior = new NoCauda(this.x, this.y, this.canvasContext)
  }
}

class Jogador {
  cobra;

  constructor(x, y, canvasContext) {
    this.cobra = new NoCauda(x, y, canvasContext);
  }

  comer(fruta) {
    // fruta.consumir();
    this.cobra.addNo();
    console.log('comeu')
  }
}

class Fruta {
  x;
  y;
  canvasContext;

  constructor(x, y, canvasContext) {
    this.x = x;
    this.y = y;
    this.canvasContext = canvasContext
  }

  render() {
    this.canvasContext.fillStyle = 'red';
    this.canvasContext.fillRect(this.x, this.y, MEDIDA_TO_PIXEL, MEDIDA_TO_PIXEL);
  }

  consumir() {
    this.canvasContext.clearRect(this.x, this.y, MEDIDA_TO_PIXEL, MEDIDA_TO_PIXEL);
  }
}

class Tabuleiro {
  canvas;
  canvasContext;
  width;
  height;
  jogador;
  frutas;

  constructor(canvas) {
    this.canvas = canvas;
    this.canvasContext = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.frutas = [];
  }

  load(jogador) {
    this.jogador = jogador
    if (this.jogador == null) {
      throw new Error('Jogador deve estar definido antes de carregar o tabuleiro')
    }

    this.jogador.cobra.canvasContext = this.canvasContext;
    jogador.cobra.render()

    this.spawnFrutas()
  }

  spawnFrutas() {
    for (let i = 0; i < parseInt(Math.random() * 20, 10); i++) {

      const x = parseInt(Math.random() * WIDTH_TABULEIRO, 10);
      const y = parseInt(Math.random() * WIDTH_TABULEIRO, 10);
      const fruta = new Fruta(x, y, this.canvasContext);

      this.frutas.push(fruta)

      fruta.render()
    }
  }

  atualizarPosicaoJogador(x, y) {
    this.jogador.cobra.atualizarPosicao(x, y);
    
    if (this.isJogadorEmCimaDeFruta()) {
      this.jogador.comer()
    }
  }

  isJogadorEmCimaDeFruta() {
    return this.frutas.find(fruta => fruta.x == this.jogador.cobra.x && fruta.y == this.jogador.cobra.y) != null
  }
}

function init() {
  const tabuleiroCanvas = document.getElementById('game-board');
  
  const tabuleiro = new Tabuleiro(tabuleiroCanvas)
  const jogador = new Jogador(5, 5);

  tabuleiro.load(jogador);
  
  observeTeclado(tabuleiro)
}

function observeTeclado(tabuleiro) {
  document.addEventListener('keydown', (event) => {
    // console.log(event)

    switch (event.key) {
      case 'ArrowRight':
        if (tabuleiro.jogador.cobra.x + MEDIDA_TO_PIXEL <= tabuleiro.width) {
          tabuleiro.atualizarPosicaoJogador(tabuleiro.jogador.cobra.x + MEDIDA_TO_PIXEL, tabuleiro.jogador.cobra.y);
        }
        break;
      case 'ArrowLeft':
        if (tabuleiro.jogador.cobra.x - MEDIDA_TO_PIXEL >= 0) {
          tabuleiro.atualizarPosicaoJogador(tabuleiro.jogador.cobra.x - MEDIDA_TO_PIXEL, tabuleiro.jogador.cobra.y);
        }
        break;
      case 'ArrowDown':
        if (tabuleiro.jogador.cobra.y + MEDIDA_TO_PIXEL <= tabuleiro.height) {
          tabuleiro.atualizarPosicaoJogador(tabuleiro.jogador.cobra.x, tabuleiro.jogador.cobra.y + MEDIDA_TO_PIXEL);
        }
        break;
      case 'ArrowUp':
        if (tabuleiro.jogador.cobra.y - MEDIDA_TO_PIXEL >= 0) {
          tabuleiro.atualizarPosicaoJogador(tabuleiro.jogador.cobra.x, tabuleiro.jogador.cobra.y - MEDIDA_TO_PIXEL);
        }
        break;
    }
  })
}

init();
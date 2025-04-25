class NoCauda extends GameObject {
  anterior;

  constructor(x, y) {
    super(x, y);
    this.anterior = null;
  }

  atualizarPosicao(x, y) {
    let oldX = this.x;
    let oldY = this.y;

    this.x = x;
    this.y = y;

    if (this.anterior) {
      this.anterior.atualizarPosicao(oldX, oldY)
    }
  }

  addNo() {
    if (this.anterior) {
      this.anterior.addNo();
      return;
    }

    this.anterior = new NoCauda(this.x, this.y)
  }

  getColor() {
    return 'green'
  }
}

class Jogador {
  head;
  direcao = { x: 1, y: 0 };

  constructor(x, y, canvasContext) {
    this.head = new NoCauda(x, y, canvasContext);
  }

  setCanvasContent(canvasContext) {
    let noAtual = this.head;

    while (noAtual) {
      noAtual.canvasContext = canvasContext;
      noAtual = noAtual.anterior;
    }
  }

  atualizarPosicao(x, y) {
    this.head.atualizarPosicao(x, y)
  }

  comer() {
    this.crescer();
  }

  crescer() {
    this.head.addNo();
  }
}
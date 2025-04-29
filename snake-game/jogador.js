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
  direcao;

  constructor(x, y) {
    this.head = new NoCauda(x, y);
    
    this.head.addNo();
  }

  atualizarPosicao() {
    let x = this.head.x + (this.direcao?.incrementoX ?? 0);
    let y = this.head.y + (this.direcao?.incrementoY ?? 0);

    this.head.atualizarPosicao(x, y);
  }

  mudarDirecao(direcao) {
    if (!this.direcao?.isOposta(direcao)) {
      this.direcao = direcao;
    }
  }

  comer() {
    this.crescer();
  }

  crescer() {
    this.head.addNo();
  }
}
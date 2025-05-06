class Direcao {
  incrementoX;
  incrementoY;

  constructor(incrementoX, incrementoY) {
    this.incrementoX = incrementoX;
    this.incrementoY = incrementoY;
  }

  isOposta(other) {
    return this.incrementoX + other.incrementoX == 0 && this.incrementoY + other.incrementoY == 0;
  }
}

const Direcoes = {
  DIREITA: new Direcao(1,0),
  ESQUERDA: new Direcao(-1, 0),
  BAIXO: new Direcao(0, 1),
  CIMA: new Direcao(0, -1)
}
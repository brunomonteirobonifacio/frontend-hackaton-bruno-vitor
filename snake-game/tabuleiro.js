const MEDIDA_TO_PIXEL = 5;


class Tabuleiro {
  width;
  height;
  matriz = [];
  jogador;
  frutas = [];

  constructor(tabuleiroCanvas, scale) {
    this.width = tabuleiroCanvas.getAttribute('width') / scale;
    this.height = tabuleiroCanvas.getAttribute('height') / scale;
    
    if (this.width <= 0 || this.height <= 0) {
      throw new Error('Both width and height must be greater than zero')
    }
  }

  start() {
    this.spawnFrutas();
    this.resetMatriz();
    this.loadObjectsToMatriz();
  }

  step() {
    if (this.matriz[this.jogador.head.y][this.jogador.head.x]?.constructor.name == 'Fruta') {
      const frutaRemoverX = this.jogador.head.x;
      const frutaRemoverY = this.jogador.head.y;

      this.jogador.comer();
      this.frutas = this.frutas.filter(fruta => fruta.x != frutaRemoverX && fruta.y != frutaRemoverY);
    }

    if (this.frutas.length == 0) {
      this.spawnFrutas();
    }

    this.resetMatriz();
    this.loadObjectsToMatriz();
  }

  loadObjectsToMatriz() {
    let noAtual = this.jogador.head;

    this.frutas.forEach(fruta => console.log(fruta))
    this.frutas.forEach(fruta => this.matriz[fruta.y][fruta.x] = fruta)

    while (noAtual) {
      this.matriz[noAtual.y][noAtual.x] = noAtual
      noAtual = noAtual.anterior;
    }
  }

  spawnFrutas() {
    for (let i = 0; i < Math.max(5, parseInt(Math.random() * 20, 10)); i++) {

      const x = parseInt(Math.random() * this.width, 10);
      const y = parseInt(Math.random() * this.height, 10);
      console.log(y)
      const fruta = new Fruta(x, y);

      console.log(fruta)

      this.frutas.push(fruta)
    }
  }

  resetMatriz() {
    for (let i = 0; i < this.height; i++) {
      this.matriz[i] = [];

      for (let j = 0; j < this.width; j++) {
        this.matriz[i].push(null);
      }
    }
  }

  atualizarPosicaoJogador(x, y) {
    this.jogador.head.atualizarPosicao(x, y);
    this.step();
  }
}
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

  loadObjectsToMatriz() {
    this.loadFrutasToMatriz();
    this.loadJogadorToMatriz();
  }

  loadFrutasToMatriz() {
    this.frutas.forEach(fruta => this.matriz[fruta.y][fruta.x] = fruta);
  }

  loadJogadorToMatriz() {
    let noAtual = this.jogador.head;
    while (noAtual) {
      this.matriz[noAtual.y][noAtual.x] = noAtual
      noAtual = noAtual.anterior;
    }
  }

  spawnFrutas() {
    for (let i = 0; i < Math.max(5, parseInt(Math.random() * 20, 10)); i++) {
      this.spawnFruta();      
    }
  }

  spawnFruta() {
    const x = parseInt(Math.random() * this.width, 10);
    const y = parseInt(Math.random() * this.height, 10);
    const fruta = new Fruta(x, y);

    this.frutas.push(fruta);
  }

  resetMatriz() {
    for (let i = 0; i < this.height; i++) {
      this.matriz[i] = [];

      for (let j = 0; j < this.width; j++) {
        this.matriz[i].push(null);
      }
    }
  }
  
  isJogadorColidiuBorda() {
    return this.jogador.head.x >= this.width || this.jogador.head.x < 0 || this.jogador.head.y >= this.height || this.jogador.head.y < 0;
  }

  isJogadorColidiuCauda() {
    return this.jogador.direcao && this.getObjectJogadorColidiu()?.constructor.name == NoCauda.name;
  }

  getFrutaJogadorColidiu() {
    const collidedObject = this.getObjectJogadorColidiu();

    return collidedObject?.constructor.name == Fruta.name
      ? collidedObject
      : null;
  }

  getObjectJogadorColidiu() {
    if (this.isJogadorColidiuBorda()) {
      throw new Error('Jogador fora do tabuleiro');
    }

    return this.matriz[this.jogador.head.y][this.jogador.head.x];
  }

  removeFruta(fruta) {
    if (fruta) {
      this.frutas.splice(this.frutas.indexOf(fruta), 1);
    }
  }
}
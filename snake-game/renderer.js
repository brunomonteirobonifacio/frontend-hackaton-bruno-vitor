class Renderer {
  tabuleiro;
  canvasContext;

  constructor(tabuleiro, canvas) {
    this.tabuleiro = tabuleiro;
    this.canvasContext = canvas.getContext('2d');
  }

  render() {
    this.clearCanvas();

    const matriz = this.tabuleiro.matriz.slice();
    
    for (let y = 0; y < matriz.length; y++) {
      for (let x = 0; x < matriz[y].length; x++) {
        const currentObject = matriz[y][x];

        if (currentObject && currentObject.getColor) {
          this.canvasContext.fillStyle = currentObject.getColor();
          this.canvasContext.fillRect(x, y, 1, 1);
        }
      }
    }
  }

  setScale(scale) {
    this.canvasContext.scale(scale, scale);
  }

  clearCanvas() {
    this.canvasContext.clearRect(0, 0, this.tabuleiro.matriz.length, this.tabuleiro.matriz[0].length)
  }
}
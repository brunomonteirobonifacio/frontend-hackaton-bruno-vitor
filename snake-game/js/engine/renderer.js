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
    const gridColor = this.tabuleiro.getGridColor
    if (gridColor) {
      this.canvasContext.strokeStyle = this.tabuleiro.getGridColor();
      this.canvasContext.lineWidth = 0.001
    }

    for (let y = 0; y < matriz.length; y++) {
      for (let x = 0; x < matriz[y].length; x++) {
        const currentObject = matriz[y][x];

        if (gridColor) {
          this.canvasContext.strokeRect(x, y, 1, 1)
        }
        
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
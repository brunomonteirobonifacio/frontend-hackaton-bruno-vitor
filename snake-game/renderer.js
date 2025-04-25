class Renderer {
  tabuleiro;
  canvasContext;

  scale = 1;
  step = 1;

  constructor(tabuleiro, canvas) {
    this.tabuleiro = tabuleiro;
    this.canvasContext = canvas.getContext('2d');
  }

  render() {
    this.clearCanvas();

    for (let y = 0; y < this.tabuleiro.height; y++) {
      for (let x = 0; x < this.tabuleiro.width; x++) {
        const currentObject = this.tabuleiro.matriz[y][x]

        if (currentObject != null && currentObject.__proto__.__proto__ == GameObject.prototype) {
          this.canvasContext.fillStyle = currentObject.getColor();
          this.canvasContext.fillRect(x + this.step, y + this.step, this.scale, this.scale);
        }
      }
    }
  }

  clearCanvas() {
    this.canvasContext.clearRect(0, 0, this.tabuleiro.width, this.tabuleiro.height)
  }
}
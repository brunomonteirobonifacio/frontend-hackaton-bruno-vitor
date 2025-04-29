// TODO: essa classe não deve ser um Observer, fica muito acoplado; verificar melhor como corrigir
class Renderer extends Observer {
  tabuleiro;
  canvasContext;

  constructor(tabuleiro, canvas) {
    super();
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
          this.canvasContext.fillRect(x, y, 1, 1);
        }
      }
    }
  }

  setScale(scale) {
    this.canvasContext.scale(scale, scale);
  }

  clearCanvas() {
    this.canvasContext.clearRect(0, 0, this.tabuleiro.width, this.tabuleiro.height)
  }

  // TODO: OBSERVER, VERIFICAR SE DEVE FICAR AQUI
  update() {
    this.render();
  }
}
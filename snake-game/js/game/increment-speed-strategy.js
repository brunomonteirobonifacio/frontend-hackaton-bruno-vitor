class IncrementSpeedStrategy {
  apply;

  constructor(action = () => {}) {
    this.apply = action;
  }
}

const IncrementSpeedStrategies = {
  BY_TAIL_LENGTH: new IncrementSpeedStrategy((gameLoop) => {
    gameLoop.game.on('update', () => {
      gameLoop.incrementSpeed = (gameLoop.game.tabuleiro.jogador.tamanho() - (gameLoop.game.tabuleiro.jogador.tamanhoInicial - 1)) * 0.05
    })
  }),

  BY_RUN_TIME: new IncrementSpeedStrategy((gameLoop) => {
    function incrementSpeedUpdate() {
      console.log(gameLoop.incrementSpeed)
      setTimeout(() => {
        if (gameLoop.game.status == GameStatus.RUNNING) {
          gameLoop.incrementSpeed += 0.01

          incrementSpeedUpdate();
        }
      }, 1000)
    }

    incrementSpeedUpdate();
  }),

  DONT_INCREMENT: new IncrementSpeedStrategy()
}
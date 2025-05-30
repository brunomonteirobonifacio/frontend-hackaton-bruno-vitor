class IncrementSpeedStrategy {
  apply;

  constructor(action = () => {}) {
    this.apply = action;
  }
}

const IncrementSpeedStrategies = {
  BY_SCORE: new IncrementSpeedStrategy((gameLoop) => {
    gameLoop.game.on('update', () => {
      gameLoop.incrementSpeed = gameLoop.game.score * 0.01
    })
  }),

  BY_RUN_TIME: new IncrementSpeedStrategy((gameLoop) => {
    function incrementSpeedUpdate() {
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
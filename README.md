# Projeto Intermediário - Hackaton Frontend
Projeto desenvolvido para a disciplina de Frontend, feito por [Bruno Monteiro Bonifácio](https://github.com/brunomonteirobonifacio) e [Vitor Nascimento Batista](https://github.com/v11kt0r)

## Jogo da cobrinha
Jogo em que o jogador controla uma cobra e come frutas ao longo do mapa, evitando bater nas bordas do tabuleiro e em seu próprio corpo. Cada fruta que o jogador come conta como um ponto e aumenta o tamanho da cauda da cobra.

**APIs utilizadas**:
* Canvas: para apresentar o jogo na página;
* LocalStorage: para guardar o recorde do jogador;
* SessionStorage: para guardar a opção de aumento de velocidade selecionada pelo jogador;
* Timer: para controlar o loop do jogo e o incremento de velocidade com setTimeout;
* Event: para ler os comandos de teclado e os clicks de botões pelo jogador;
* DOM: para selecionar a opção de aumento de velocidade preferida do jogador (salva no sessionStorage) e exibir a pontuação e o recorde;
* Notification: para notificar o jogador quando ele quebrar seu recorde.

**Como jogar:**

O jogo começa a rodar a partir do momento que o jogador entra na página, porém a cobra (rastro de pontos verdes) estará parada. O jogador pode usar as flechas do teclado (cima, baixo, esquerda e direita) para determinar a direção em que a cobra irá se mover. O jogador pode comer as frutas fazendo a cobra se mover até ela com as flechas do teclado e, ao comer uma fruta, a cobra aumenta seu tamanho e o jogador ganha um ponto. Porém, caso bata na parede (ou na própria cauda), o jogo acaba.
Ao entrar no jogo, o usuário será solicitado por permissão de enviar notificações, que são enviadas quando o usuário quebra seu recorde.
É possível reiniciar o jogo, ativar e desativar a música e escolher o tipo de aumento de velocidade, que funcionam como "modos de jogo": não aumentar a velocidade; aumentar a velocidade de acordo com a pontuação; e aumentar a velocidade de acordo com o tempo de jogo.

## Assistente cobrinha
Assistente virtual da cobrinha, que conta piadas, diz a hora e mostra sua localização atual, falando tudo com tom de sarcasmo.

**APIs utilizadas**:
* Fetch: para buscar as piadas utilizando a API de piadas [JokeAPI](https://sv443.net/jokeapi/v2/)
* Navigation: para mostrar a localização do usuário.
* Date: para exibir a hora atual na tela;
* Event: para detectar quando o usuário aperta um botão e qual foi pressionado;
* DOM: para exibir as falas da cobra no HTML.

**Como funciona**:

A assistente é ativada automaticamente ao carregar a página e se comunica com o jogador por meio de falas com tom humorado. O usuário pode clicar em botões para ler uma piada aleatória, descobrir a hora atual ou ver sua localização aproximada com base na API de geolocalização. Além de controlar a música da página, podendo ativar ou pausar a trilha sonora a qualquer momento.



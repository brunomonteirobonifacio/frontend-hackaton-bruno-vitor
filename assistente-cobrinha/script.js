const piadasEmPortugues = [
  "Por que a cobra entrou no computador? Porque ela queria dar um byte!",
  "Como o elétron atende o telefone? Próton!",
  "Qual é o peixe mais engraçado? O piaducho.",
  "Por que a matemática está triste? Porque tem muitos problemas.",
  "Sabe por que o livro de matemática se suicidou? Porque tinha muitos problemas.",
  "O que o zero disse para o oito? Belo cinto!",
  "Por que o jacaré tirou o filho da escola? Porque ele réptil de ano!",
  "O que a impressora disse para o papel? Estou ficando sem paciência com você!",
  "Por que o computador foi ao médico? Porque ele estava com um vírus!",
  "Como se chama um boi que toca violino? Boisterioso!"
];

let ultimaPiada = "";


function falar(frase) {
    document.getElementById("fala-cobrinha").textContent = frase;
  }

  async function falarAlgo() {
    try {
      const res = await fetch('https://v2.jokeapi.dev/joke/Any?lang=pt');
      if (!res.ok) throw new Error('Falha na piada.');
      
      const data = await res.json();
      let piada;
  
      if (data.type === 'single') {
        piada = data.joke;
      } else {
        piada = `${data.setup} ... ${data.delivery}`;
      }
  
      
      if (piada === ultimaPiada) {
        throw new Error("Piada repetida detectada.");
      }
  
      ultimaPiada = piada;
  
      falar(`"${piada}" — SSSSSZZZZSSS *Risada Sem Graça na Língua das Cobras* 🐍.`);
    } catch (err) {
      let novaPiada;
      do {
        novaPiada = piadasEmPortugues[Math.floor(Math.random() * piadasEmPortugues.length)];
      } while (novaPiada === ultimaPiada); 
  
      ultimaPiada = novaPiada;
  
      falar(`"${novaPiada}"`);
    }
  }
  
  
 

  function mostrarHora() {
    const hora = new Date().toLocaleTimeString();
    const frases = [
      `São exatamente ${hora}. Você podia só olhar pro canto da tela, né? SSSZZZZSSS`,
      "Você percebeu que eu não consigo usar relógio?",
      "Você realmente precisava de mim pra isso?"
    ];
    falar(frases[Math.floor(Math.random() * frases.length)]);
  }

  function mostrarLocalizacao() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          falar(`Achei você. Latitude: ${latitude.toFixed(2)}, Longitude: ${longitude.toFixed(2)}. Agora se esconda melhor.`);
        },
        () => falar("Você é um humano meio contraditório hein? Quer ver a localização ou não? SSSZZZZ....")
      );
    } else {
      falar("Seu navegador é do tempo do IE6? Não tem nem geolocalização...");
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('musicaFundo');
    audio.volume = 0.2; // volume baixo (0.0 a 1.0)
  });

  document.getElementById('botaoMusica').addEventListener('click', () => {
    const audio = document.getElementById('musicaFundo');
  
    if (audio.paused) {
      audio.volume = 0.2; // define o volume baixo
      audio.play().catch(err => console.log("Erro ao tocar a música:", err));
    } else {
      audio.pause();
    }
  });

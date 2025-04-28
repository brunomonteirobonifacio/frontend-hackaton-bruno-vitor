function falar(frase) {
    document.getElementById("fala-cobrinha").textContent = frase;
  }

  async function falarAlgo() {
    try {
      const res = await fetch('https://icanhazdadjoke.com/', {
        headers: {
          Accept: 'application/json'
        }
      });
      if (!res.ok) throw new Error('Falha ao buscar piada.');
      const data = await res.json();
      falar(`"${data.joke}" — SSSSZZZSSSS *força risada em língua de cobra*.`);
    } catch (err) {
      const fallbackFrases = [
        "Não consegui pensar em nada, volte mais tarde.",
        "Nem toda conexão é verdadeira.",
        "SSSZZZSSSS!!! *Reclamação na Língua das Cobras*."
      ];
      falar(fallbackFrases[Math.floor(Math.random() * fallbackFrases.length)]);
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
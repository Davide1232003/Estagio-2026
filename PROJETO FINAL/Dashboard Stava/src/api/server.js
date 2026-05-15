{
  /* Importações e Configuração Inicial */
}

import "dotenv/config"; // 1. Carrega variáveis do ficheiro .env para o process.env
import express from "express"; // 2. Importa a framework para criar o servidor (Node.js)
import axios from "axios"; // 3. Importa o cliente para fazer pedidos HTTP a outros sites
import cors from "cors"; // 4. Importa a segurança que permite que o teu React fale com o Node

const app = express(); // 5. Cria a aplicação (o teu servidor)
app.use(cors()); // 6. Ativa o CORS para evitar bloqueios de segurança entre portas (5173 -> 3000)
app.use(express.json()); // 7. Permite que o servidor consiga ler dados enviados em formato JSON

{
  /*Rota de Login*/
}

app.get("/login", (req, res) => {
  // 8. Define que permissões queres pedir ao utilizador no Strava
  const scope = "read,activity:read_all,profile:read_all";

  // 9. O endereço para onde o Strava deve enviar o utilizador após ele aceitar
  const redirectUri =
    "https://overarch-felt-tip-quickstep.ngrok-free.dev/exchange_token";

  // 10. Monta o URL completo de autorização do Strava com o teu Client ID
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=228494&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scope}`;

  // 11. Envia uma ordem ao browser do utilizador para ele "saltar" para o site do Strava
  res.redirect(authUrl);
});

{
  /*Rota para trocar o código de autorização pelo token de acesso*/
}
// 12. 'async' porque vamos esperar por uma resposta da internet (Strava)
app.get("/exchange_token", async (req, res) => {
  // 13. Extrai o 'code' que o Strava enviou no fim do URL (?code=xxxxx)
  const { code } = req.query;

  // 14. Se por algum motivo o Strava não enviou o código, para aqui e avisa
  if (!code) {
    return res.status(400).json({ erro: "No code provided" });
  }

  try {
    // 15. 'await' faz o servidor esperar pela resposta do axios antes de avançar
    const response = await axios({
      method: "post", // 16. Pedido do tipo POST (envio de dados confidenciais)
      url: "https://www.strava.com/oauth/token", // 17. Endereço do Strava para troca de tokens
      data: {
        // 18. O corpo do pedido (os teus segredos)
        client_id: "228494",
        client_secret: "a4931b6f6df9b9da016610ed23b2f5d691537348", // Chave mestre
        code: code, // O código temporário do utilizador
        grant_type: "authorization_code", // Indica que estamos a trocar um código por um token
      },
      headers: { "Accept-Encoding": "application/json" }, // 19. Diz ao Strava que queremos a resposta em JSON
    });

    // 20. Extrai o token de acesso final da resposta do Strava
    const accessToken = response.data.access_token;

    // 21. Redireciona o utilizador de volta para o teu site React, levando o token no URL
    return res.redirect(`http://localhost:5173/dashboard?token=${accessToken}`);
    {
      /*Tratamento de erros e inicilaização do servidor*/
    }
  } catch (error) {
    // 22. Imprime no teu terminal o erro detalhado que o Strava enviou
    console.error("Strava Error:", error.response?.data || error.message);

    // 23. Responde ao browser com um erro 500 (Erro de Servidor)
    return res.status(500).json({
      erro: "Falha na troca de token",
      detalhes: error.response?.data || error.message,
    });
  }
});

// 24. Liga o servidor e fica à escuta na porta 3000
app.listen(3000, () => console.log("Servidor Auth ativo na porta 3000"));

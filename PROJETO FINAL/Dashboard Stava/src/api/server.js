import "dotenv/config";
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Rota de Login
app.get("/login", (req, res) => {
  const scope = "read,activity:read_all,profile:read_all";
  const redirectUri = process.env.REDIRECT_URI;
  const authUrl = `https://www.strava.com/oauth/authorize?client_id=${process.env.STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}&approval_prompt=force&scope=${scope}`;
  res.redirect(authUrl);
});

// Rota para trocar o código pelo token
app.get("/exchange_token", async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ erro: "No code provided" });
  }

  try {
    const response = await axios({
      method: "post",
      url: "https://www.strava.com/oauth/token",
      data: {
        client_id: process.env.STRAVA_CLIENT_ID,
        client_secret: process.env.STRAVA_CLIENT_SECRET,
        code: code,
        grant_type: "authorization_code",
      },
      headers: { "Accept-Encoding": "application/json" },
    });

    const { access_token } = response.data;
    return res.redirect(
      `http://localhost:5173/dashboard?token=${access_token}`,
    );
  } catch (error) {
    console.error("Strava Error:", error.response?.data || error.message);
    return res.status(500).json({
      erro: "Falha na troca de token",
      detalhes: error.response?.data || error.message,
    });
  }
});

app.listen(3000, () => console.log("Servidor Auth ativo na porta 3000"));

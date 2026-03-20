import { useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import WeatherInformations from "./components/WeatherInformations/WeatherInformations";
import WeatherInformations5Days from "./components/WeatherInformations5Days/WeatherInformations5Days";

function App() {
  const [weather, setWeather] = useState();
  const [weather5Days, setWeather5Days] = useState();
  const inputRef = useRef();

  async function searchCity() {
    const city = inputRef.current.value; // Pega o nome da cidade escrito no input
    const key = "2120dcf6be99432686beac94549a5706"; // Chave para aceder à API

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=pt&units=metric`; // Endereço da API com as configurações de cidade, língua e unidade
    const urlEvents = `https://api.virtude.purpleprofile.pt/event/published`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=pt&units=metric`;

    const apiInfo = await axios.get(url); // Faz a chamada ao servidor e espera pela resposta
    const apiInfo5Days = await axios.get(url5Days); //Faz outra chamada ao servidor e espera por outra resposta
    const apiEvents = await axios.get(urlEvents);

    setWeather(apiInfo.data); // Guarda os dados recebidos no estado na váriavel "weather" para mostrar no ecrã
    setWeather5Days(apiInfo5Days.data); // Guarda os dados recebidos no estado na váriavel "weather5Days" para mostrar no ecrã
    console.log(apiEvents.data);
  }

  return (
    <>
      <div className="container">
        <h1>Previsão do Tempo</h1>
        <input
          ref={inputRef}
          type="text"
          placeholder="Escreve o nome da cidade..."
        />
        <button onClick={searchCity}>Pesquisar</button>

        {weather && <WeatherInformations weather={weather} />}
        {weather5Days && (
          <WeatherInformations5Days weather5Days={weather5Days} />
        )}
      </div>
    </>
  );
}

export default App;

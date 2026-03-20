import "./App.css";
import LogoLoop from "./component/icons/LogoLoop";
import Java from "./assets/Java.png";
import JavaScript from "./assets/JavaScript.png";

function App() {

  const logosProjeto = [
  { src: Java, alt: "Company 1"},
  { src: JavaScript, alt: "Company 1"},
  { src: Java, alt: "Company 1"},
  { src: Java, alt: "Company 1"},
  { src: Java, alt: "Company 1"},
  { src: Java, alt: "Company 1"},
  { src: Java, alt: "Company 1"},
];

  return (

      <div className="logo-loop-container">
        <LogoLoop 
          logos={logosProjeto} 
          speed={150} 
          direction="left" 
          logoHeight={65}
          gap={50}
        />
      </div>

  
  );
}

export default App;
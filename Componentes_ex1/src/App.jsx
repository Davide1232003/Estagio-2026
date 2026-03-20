import Card from "./components/Card"
import "./style_home.css"

function App (){
  return (
    <div>
      <div className = "container-app">
        <Card xp="Pleno" cidade="Lisboa"/>
        <Card xp="Sénior" cidade="Porto"/>
        <Card xp="Pleno" cidade="Lisboa"/>
        <Card xp="Pleno" cidade="Lisboa"/>
        <Card xp="Pleno" cidade="Lisboa"/>
        <Card xp="Pleno" cidade="Lisboa"/>
        <Card xp="Pleno" cidade="Lisboa"/>
        <Card xp="Pleno" cidade="Lisboa"/>
      </div>
    </div>
  )
}

export default App 
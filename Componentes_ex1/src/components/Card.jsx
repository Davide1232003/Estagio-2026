import "./style_card.css"
import { FaSignal } from "react-icons/fa6";
import { BsFillGeoAltFill } from "react-icons/bs";
import Button from "./button";

function Card (props) {
    return (
        <div className = "container-card">
            <h1>Desenvolvedor</h1>
            <hr />
            <div className = "icone-container">
                <FaSignal className = "icons"/>
                <p><span>Funcionário:</span> {props.xp}</p>
            </div>
             <div className = "icone-container">
                <BsFillGeoAltFill className = "icons"/>
                <p><span>Cidade:</span> {props.cidade}</p>
            </div>
        <Button />  
        </div>


    );
}

export default Card
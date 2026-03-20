import React from 'react';
import './StylesExamples.css';
import styles from './StylesExamples.module.css';

function StylesExamples() {
//inline
const inlineStyles = {
    color: "blue",
    fontSize: "20px",
};

    return (
        <div>
            <h2 style={inlineStyles}>Estilos inline</h2>
           
            {/* arquivos de estilos */}
            <p className="text"> Meu CSS</p>

            {/* CSS Modules */}
            <p className={styles.textPurple}>Meu Module CSS</p>

        </div>
    )   
};

export default StylesExamples;
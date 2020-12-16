import {useState} from 'react'
import classes from '../styles/Card.module.css'
import { Dropdown } from 'primereact/dropdown'


const Card = (props) => {
// {/* <input placeholder="Напиши твоето име" value={yourName} onChange={(e) => setYourName(e.target.value)}></input> */}
    const [name, setName] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [yourName, setYourName] = useState("");

    const names = [
        {label: "Алекс", key: 1},
        {label: "Никол", key: 2},
        {label: "Асен", key: 3},
        {label: "Стефчо", key: 4},
        {label: "Тони", key: 5}
    ]

    const handleGenerate = () => {
        document.getElementById("card").classList.toggle(classes.theCardActive);
        setTimeout(() => {
            fetch(`https://localhost:3000/api/hello?name=${yourName.label}`).then(response => response.json())
            .then(data => {
                setDisableButton(true);
                setName(data.name)
            });
        }, 10000)
        
       

    }

    return (
        <>
            <div className={classes.mainContainer}>

                <div id="card" className={classes.theCard}>
                    <div className={classes.theFront}>
                        <span className={classes.text}>
                            {name}
                        </span>
                    </div>
                </div>

            </div>


            <div className={classes.buttonHolder}>
                <Dropdown value={yourName} style={{width: "100%"}} placeholder="Избери името си" options={names} onChange={(e) => setYourName(e.value)}/>
                
                <button disabled={disableButton} className={classes.button} onClick={() => handleGenerate()}>Генерирай име</button>
            </div>
        </>
    )
}

export default Card;
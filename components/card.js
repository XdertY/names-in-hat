import {useState} from 'react'
import classes from '../styles/Card.module.css'
import { Dropdown } from 'primereact/dropdown'


const Card = (props) => {
// {/* <input placeholder="Напиши твоето име" value={yourName} onChange={(e) => setYourName(e.target.value)}></input> */}
    const [name, setName] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [yourName, setYourName] = useState("");

    const names = [
        {label: "Асен", key: 1},
        {label: "Никол", key: 2},
        {label: "Стефчо", key: 3},
        {label: "Тони", key: 4},
        {label: "Алекс", key: 5}
    ]

    const handleGenerate = () => {
        document.getElementById("card").classList.toggle(classes.theCardActive);
        setTimeout(() => {
            const url = "https://names-in-hat.vercel.app"
            // const url = "http://localhost:3000"
            fetch(`${url}/api/hello?name=${yourName.key}`).then(response => response.json())
            .then(data => {
                setDisableButton(true);
                setName(data.name)
            });
        }, 8000)
        
       

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
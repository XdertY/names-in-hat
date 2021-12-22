import {useState, useEffect} from 'react'
import classes from '../styles/Card.module.css'
import { Dropdown } from 'primereact/dropdown'
import { getFirestore, collection, getDocs, updateDoc, doc ,setDoc } from 'firebase/firestore';
import { firebase } from '../firebase/clientApp'
import axios from 'axios'


const Card = (props) => {
    const [name, setName] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [yourName, setYourName] = useState("");
    const [names, setNames] = useState([]);
    const db = getFirestore(firebase);

    useEffect(() => {
        getNames(db);
    }, [])

    const getNames = async (db)  =>  {
        const namesCol = collection(db, 'names');
        const namesSnapshot = await getDocs(namesCol);
        const namesList = namesSnapshot.docs.map(doc => doc.data());
        setNames(namesList[0].from.map((el, index) => {
            return {key: index, label: el}
        }));
    }

    const handleGenerate = async () => {
        document.getElementById("card").classList.toggle(classes.theCardActive);

        const namesCol = collection(db, 'names');
        const namesSnapshot = await getDocs(namesCol);
        const namesList = namesSnapshot.docs.map(doc => doc.data());
        const toNames = namesList[0].to.filter(el => el !== yourName.label);

        const namesDocRef = doc(db, "names/0fhAXTFmr6Y5HgN23grA");
        const randomName = toNames[Math.floor(Math.random()*toNames.length)];

        await setDoc(namesDocRef, {from: ['Алекс Б.', 'Алекс П.', 'Асен', 'Стефчо', 'Тони', 'Никол'], to:  namesList[0].to.filter(el => el !== randomName)});
        setDisableButton(true);
        setTimeout(() => {
            setName(randomName);
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
                <Dropdown value={yourName} style={{width: "100%"}} placeholder="Избери името си" options={names} onChange={(e) => setYourName(e.value)} disabled={names.length <= 0}/>

                <button disabled={yourName === "" || disableButton} className={classes.button} onClick={() => handleGenerate()}>Генерирай име</button>
            </div>
        </>
    )
}

export default Card;

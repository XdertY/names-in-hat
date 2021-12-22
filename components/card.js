import {useState, useEffect, useRef} from 'react'
import classes from '../styles/Card.module.css'
import { Dropdown } from 'primereact/dropdown'
import { getFirestore, collection, getDocs, doc ,setDoc, onSnapshot } from 'firebase/firestore';
import { firebase } from '../firebase/clientApp'
import axios from 'axios'


const Card = (props) => {
    const [name, setName] = useState("");
    const [disableButton, setDisableButton] = useState(false);
    const [yourName, setYourName] = useState("");
    const [names, setNames] = useState([]);
    const [fromNames, setFromNames] = useState([]);
    const [toNames, setToNames] = useState([]);
    const generating = useRef(false);
    const db = getFirestore(firebase);

    useEffect(() => {
        const namesDocRef = doc(db, "names/0fhAXTFmr6Y5HgN23grA");
        onSnapshot(namesDocRef, getNames)
    }, [])

    const getNames = async ()  =>  {
        const namesCol = collection(db, 'names');
        const namesSnapshot = await getDocs(namesCol);
        const namesList = namesSnapshot.docs.map(doc => doc.data());
        if(!generating.current) {
            console.log(generating);
            setFromNames(namesList[0].from);
            setNames(namesList[0].from.map((el, index) => {
                return {key: index, label: el}
            }));
        }
        setToNames(namesList[0].to);
    }

    const handleGenerate = async () => {
        generating.current = true;
        generateNameAndRemoveFromDatabase();
        document.getElementById("card").classList.toggle(classes.theCardActive);
    }

    const generateNameAndRemoveFromDatabase = async () => {
        const namesCol = collection(db, 'names');
        const namesSnapshot = await getDocs(namesCol);
        const namesList = namesSnapshot.docs.map(doc => doc.data());
        const toNamesFiltered = toNames.filter(el => el !== yourName.label);

        const namesDocRef = doc(db, "names/0fhAXTFmr6Y5HgN23grA");
        const randomName = toNamesFiltered[Math.floor(Math.random()*toNames.length)];

        await setDoc(namesDocRef, {from: namesList[0].from.filter((el) => el !== yourName.label), to:  toNames.filter(el => el !== randomName)});
        setDisableButton(true);
        setTimeout(() => {
            setName(randomName);
        }, 8000)
    }

    const resetNames = () => {
        const namesDocRef = doc(db, "names/0fhAXTFmr6Y5HgN23grA");
        setDoc(namesDocRef, {from: ['Алекс Б.', 'Алекс П.', 'Асен', 'Стефчо', 'Тони', 'Никол'], to:  ['Алекс Б.', 'Алекс П.', 'Асен', 'Стефчо', 'Тони', 'Никол']});
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

            <button id={"resetNames"} style={{display: "none"}} onClick={() => resetNames()}/>
        </>
    )
}

export default Card;

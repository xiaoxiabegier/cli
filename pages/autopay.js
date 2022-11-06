import "../app/globals.css"
import fetch from 'node-fetch';
import {myFont} from "../app/myFont.js";
import Links from "../app/(components)/Links.js";
import { useEffect, useState} from "react"
import {db} from "../app/(components)/firestoreInit.js";
import { doc, onSnapshot } from "firebase/firestore";
import "./styles/loginCards.css"

export async function getStaticProps(){

    const initialAutopayActive = await fetch("https://undefxx.com/api/info/autopay",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())
    const emailAddresses = await fetch("https://undefxx.com/api/info/emailAddresses",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())
    const phoneNumbers = await fetch("https://undefxx.com/api/info/phoneNumbers",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())

    return {
        props: { initialAutopayActive, emailAddresses, phoneNumbers},
        revalidate: 1
    }
}
//
export default function Autopay(props){

    const [autopayActive, setAutopayActive] = useState(props.initialAutopayActive)
    const [authContacts, setAuthContacts] = useState({... props.emailAddresses, ... props.phoneNumbers})

    let buttons = []
    for(let elem in authContacts) {
        if (authContacts[elem].indexOf("@") != -1) buttons.push(< button className = {"card"} onClick = {() => alert("@")}><p>{authContacts[elem]}</p></button>)
        else buttons.push(<button className={"card"} onClick = {() => alert("()")}><p>{authContacts[elem]}</p></button>)
    }

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "/units/"+process.env.NEXT_PUBLIC_PROPERTY_ID+"/info", "info"), (doc) => {
            setAutopayActive(doc.data().autopay);
            console.log("Current data: ", doc.data());
        });
        return () => unsub()
    },[])



    let links = [{label: "<---", href: "/"}, {label:  autopayActive ? ("autopay: active") : ("autopay: inactive"), href: "/"}]

    return(
            <div className={myFont.className}>
            <Links links = {links}/>
            <div className={"grid"}>
            {buttons}
            </div>
            </div>
            )
}


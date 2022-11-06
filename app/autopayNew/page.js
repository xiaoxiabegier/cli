"use client";
import fetch from 'unfetch'

import Links from "../(components)/Links";
//import Login from "../(components)/Login";
import useSWR from 'swr'

import {use, useEffect, useMemo, useState} from "react"
import {initializeApp} from "firebase/app";
import {db} from "../(components)/firestoreInit.js";
import { doc, onSnapshot } from "firebase/firestore";

const fetcher = async url => {
    const res = await fetch("https://undefxx.com/"+url)

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.')
    // Attach extra info to the error object.
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  return res.json()
}

//async function fetcher(...args){
//    return fetch("https://undefxx.com/api/info/autopay", { next: { revalidate: 1 } }).then(x=> x.json());
//}

async function getEmailAddresses(){
    return fetch("https://undefxx.com/api/info/emailAddresses", { next: { revalidate: 1 } }).then(x=> x.json());
}

async function getPhoneNumbers(){
    return fetch("https://undefxx.com/api/info/phoneNumbers", { next: { revalidate: 1 } }).then(x=> x.json());
}

export default function Page(){

//    const phoneNumbers = use(getEmailAddresses())

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "/units/18572 Cull Canyon Rd/info", "info"), (doc) => {
            setAutopayActive(doc.data().autopay);
            console.log("Current data: ", doc.data());
        });
        return () => unsub()
    },[])

//    const initialAutopayActive = use(getAutopayActive())

    const [autopayActive, setAutopayActive] = useState(null)


    let links = [{label: "<---", href: "/"}, {label:  autopayActive ? ("autopay: active") : ("autopay: inactive"), href: "/"}]



    return(
            <>
            <Links links = {links}/>
            </>
    )
}


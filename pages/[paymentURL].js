import "../app/globals.css"
import fetch from 'node-fetch';
import {myFont} from "../app/myFont.js";
import Links from "../app/(components)/Links.js";
import { useEffect, useState} from "react"
import {db} from "../app/(components)/firestoreInit.js";
import { doc, onSnapshot } from "firebase/firestore";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../app/(components)/CheckoutForm";

export async function getStaticPaths(){
    const paths = await fetch("https://undefxx.com/api/payments/paths",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())
    return {paths: paths, fallback: false}
}

export async function getStaticProps(context){

    const paymentInfo = await fetch("https://undefxx.com/api/payments/" + context.params.paymentURL,  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())
    const unpaid = await fetch("https://undefxx.com/api/payments/unpaid",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x=> x.json());

    return {
        props: { paymentInfo, unpaid },
        revalidate: 1
    }
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export default function Page(props){
    const stripePromise = loadStripe("pk_live_51LlESTC3Ie0MSAM2CQtveok1BNyKHlkw8W0aVunFTMYjMAGi0y6dEaHreNGy0TC4oRkfSMwOkcXUftn0oTlwDaBg00bnHjzls6");

    const [clientSecret, setClientSecret] = useState(props.paymentInfo.clientSecret)
    let links = [{label: "<---", href: "/"}, {label: "", href: "/"}]

    for(let elem in props.unpaid){
        if (props.unpaid[elem].url === props.paymentInfo.url)  {
            links.push({label: props.paymentInfo.name + ": $" + numberWithCommas(props.paymentInfo.amount), href:"/"});
            break;
        } else  links.push({label: "", href:"/"})
    }

const appearance = {
  theme: 'stripe',
  }

    const options = {
        clientSecret,
        appearance,
    };


    return (
            <div className={myFont.className}>
                <Links links={links}/>
                <div className="App">
                    {clientSecret && (
                            <Elements options={options} stripe={stripePromise}>
                                <CheckoutForm />
                            </Elements>
                            )}
                </div>

            </div>
            )
}

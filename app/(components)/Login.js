"use client"
async function getEmailAddresses(){
    return fetch("https://undefxx.com/api/info/emailAddresses", { next: { revalidate: 1 } }).then(x=> x.json());
}

async function getPhoneNumbers(){
    return fetch("https://undefxx.com/api/info/phoneNumbers", { next: { revalidate: 1 } }).then(x=> x.json());
}

export default async function Login(){

    const phoneNumbers = await getPhoneNumbers()
    const emailAddresses = await getEmailAddresses()



    return(
            <>
            <h1>kill me now</h1>
            </>
    )
}
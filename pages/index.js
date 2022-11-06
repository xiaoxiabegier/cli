import "../app/globals.css"
import Links from "./Links";
import {myFont} from "../app/myFont.js";


export async function getStaticProps(){
    const info = await fetch("https://undefxx.com/api", {method: "GET", headers: {propertyID: "10144 Boca Entrada Blvd APT 116", includeFields: "name,applicationsOpen"}}).then(x => x.json());
    const unpaid = await fetch("https://undefxx.com/api/p", {method: "GET", headers: {status: "unpaid", propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x=> x.json());
    return{
        props:{info , unpaid},
        revalidate: 1
    }
}

export default function Page(props){

    const name = props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].name
    const applicationsOpen = props.info[process.env.NEXT_PUBLIC_PROPERTY_ID].applicationsOpen
    const unpaid =  props.unpaid[process.env.NEXT_PUBLIC_PROPERTY_ID].unpaid


    console.log(props.info)
    console.log(props.unpaid)

    console.log(unpaid)


    let links = [{label: name, href: "/"}]
    let dynamicRoutes = []

    if (props.applicationsOpen) {
        links.push({label: "apply", href: "/apply"})
        links.push({label: "lease", href: "/lease"})
        links.push({label: "...", href: "/explainer"})

    } else {
        links.push({label: "autopay", href: "/autopay"})
        for(let key in unpaid){
            links.push({label: unpaid[key].name, href: unpaid[key].href})
            dynamicRoutes.push("/" + unpaid[key].href)
        }
        links.push({label: "...", href: "/log"})
    }

    return(
            <div className={myFont.className}>
                <Links links ={links} dynamicRoutes = {dynamicRoutes}/>
            </div>
            )
}
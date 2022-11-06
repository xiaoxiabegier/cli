//import Links from "./(components)/Links";
//
//
//async function getName(){
//    return fetch("https://undefxx.com/api/info/name", { next: { revalidate: 1 } }).then(x=> x.json());
//}
//
//async function getUnpaid(){
//    return fetch("https://undefxx.com/api/payments/unpaid", { next: { revalidate: 1 } }).then(x=> x.json());
//}
//
//async function getApplicationsOpen(){
//    return fetch("https://undefxx.com/api/info/applicationsOpen", { next: { revalidate: 1 } }).then(x=> x.json());
//}
//
//export default async function Page(){
//
//    const name = await getName()
//    const unpaid = await getUnpaid()
//    const applicationsOpen = await getApplicationsOpen()
//
//
//    let links = [{label: name, href: "/"}]
//    let dynamicRoutes = []
//
//    if (applicationsOpen) {
//        links.push({label: "apply", href: "/apply"})
//        links.push({label: "lease", href: "/lease"})
//        links.push({label: "...", href: "/explainer"})
//
//    } else {
//        links.push({label: "autopay", href: "/autopay"})
//        for(let elem in unpaid){
//            links.push({label: unpaid[elem].name, href: unpaid[elem].url})
//            dynamicRoutes.push("/" + unpaid[elem].url)
//        }
//        links.push({label: "...", href: "/log"})
//    }
//
//
//    return(
//            <>
//            <Links links ={links} dynamicRoutes = {dynamicRoutes}/>
//            </>
//    )
//}

export default function Page(){
    return(
            <h1>ll</h1>
    )
}
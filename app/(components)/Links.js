import Link from "next/link";


export default function Links(props){

    let result = []
    for (let elem in props.links){
        result.push(<><Link href = {props.links[elem].href}> {props.links[elem].label} </Link> <br/></>)
    }
    return(
            <div className={"links"}>
                {result}
            </div>
    )
}
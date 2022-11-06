import {myFont} from "../app/myFont";
import React, {useState} from "react";
import Links from "../app/(components)/Links";
import "../app/globals.css";
import fetch from 'node-fetch';
import {
  DataGridPremium,
  GridToolbar,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium';
import Box from '@mui/material/Box';
import {createTheme, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        type: 'light',
    primary: {
            main: "#O00000",
    },
    secondary: {
            main: "#000000",
    },
},
    typography: {
        fontFamily: myFont,
        h1:{
            fontFamily: myFont
        },
    },
});



export async function getStaticProps(){

    const payments = await fetch("https://undefxx.com/api/p", {method: "GET", headers: { propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x=> x.json());

    return{
        props: {payments},
        revalidate: 1
    }
}


export default function Log(props){
    const unpaid =  props.payments[process.env.NEXT_PUBLIC_PROPERTY_ID].unpaid
    const processing =  props.payments[process.env.NEXT_PUBLIC_PROPERTY_ID].processing
    const paid =  props.payments[process.env.NEXT_PUBLIC_PROPERTY_ID].paid
    const logData = {... processing, ... paid }

    let links = [{label: "<---", href: "/"}, {label: "", href: "/"}]

    for(let elem in unpaid) {
        links.push({label: "", href: '/'})
    }
    links.push({label: "...", href: '/'})

    const [rows, setRows] = useState(getRows(logData))
    const [columns, setColumns] = useState([{field: "name", headerName:"id", width: 150}, {field: "status", headerName:"status", width: 150},  {field: "total", headerName: "total", width: 150, type: "number"}])


    return(
            <div className={myFont.className}>
                <ThemeProvider theme={theme}>
                <Links links = {links}/>
                <Box className={"dataGrid"} sx ={{height: 465, width: 540}}>
                    <DataGridPremium  rows ={rows} columns ={columns} components={{ Toolbar: GridToolbar }} experimentalFeatures={{ aggregation: true }}/>
                </Box>
                </ThemeProvider>
            </div>
    )
}

function getRows(data) {
    let rows = []
    for (let key in data){
        if (data[key].status == "paid") {
            data[key].status = "complete"
        } else if (data[key].status == "processing") {
            data[key].status = "in progress"
        }
        rows.push({id: key, name: data[key].name,total: data[key].amount, status: data[key].status })
    }
    return rows
}
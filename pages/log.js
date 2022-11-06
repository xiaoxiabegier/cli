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

    const unpaid = await fetch("https://undefxx.com/api/payments/unpaid",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())
    const logData = await fetch("https://undefxx.com/api/payments/log",  {method: "GET", mode: "cors", headers: {propertyID : process.env.NEXT_PUBLIC_PROPERTY_ID}}).then(x => x.json())

    return{
        props: {unpaid, logData},
        revalidate: 1
    }
}


export default function Log(props){
    let links = [{label: "<---", href: "/"}, {label: "", href: "/"}]

    for(let elem in props.unpaid) {
        links.push({label: "", href: '/'})
    }
    links.push({label: "...", href: '/'})

    const [rows, setRows] = useState(getRows(props.logData))
    const [columns, setColumns] = useState([{field: "id", headerName:"id", width: 150}, {field: "status", headerName:"status", width: 150},  {field: "total", headerName: "total", width: 150, type: "number"}])


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
    for (let elem in data){
        rows.push({id: data[elem].id, total: data[elem].total, status: data[elem].status })
    }
    return rows
}
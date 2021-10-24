import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import api from "../boot/axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(trackingNo:string, orderNo:string, status:string) {
  return { trackingNo,orderNo,status };
}
const HomePage: React.FunctionComponent<{}> = (props: any) => {
  const classes = useStyles();
  const [rows,setRows]= useState([])

  const handleAddTRacking = async () => {
    const data = {
      tracking_number: "RU1234560009CN",
      carrier_code: "vietnam-post",
    };
    await api
      .post("/v2/trackings/post", data)
      .then((res :any) => {
        console.log(res)
        })
      .catch((err) => console.log(err));
  };
  const handleGetAll=async()=>{

    api.get("/v2/carriers/").then((res)=>{
      console.log("res",res)
      setRows(res.data.data)
    }).catch((err:any)=> console.log("err",err))
    console.log("row",rows)
  }
  useEffect(()=>{
     
  })
  return (
    <div>
      <h3>Home page</h3>
      <div className="btn">
        <Button variant="contained" color="primary" onClick={handleAddTRacking}>
          Add Tracking
        </Button>
        <Button variant="contained" color="primary" onClick={handleGetAll}>
          Get All Tracking
        </Button>
      </div>
      <div className="table">
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row:any) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default HomePage;

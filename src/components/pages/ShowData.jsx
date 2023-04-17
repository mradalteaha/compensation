import React from 'react'
import { useLocation} from 'react-router-dom';


export default function ShowData(props){
    const location = useLocation()
    console.log(location.state)
    const {userData}=location.state
   
    const tableHead = ["id","שם","שם משפחה" ,"מין" ,"תאריך לידה","גיל",
    "תאריך תחילת עבודה", "שכר" ,"תאריך  קבלת סעיף 14", "אחוז סעיף 14" ,"שווי נכס",
    "הפקדות", "תאריך עזיבה" , "תשלום מהנכס" ,"השלמה בצ'ק","סיבת עזיבה"]

    
    return (
        <table>
          <thead>
        <tr>
          {tableHead.map(roName=> <th key={roName}>{roName}</th>)}
        </tr>
        </thead>
          <tbody>
            {userData.map((item) => (
              <tr key={item[tableHead[0]]}>
              <td>{item[tableHead[0]]}</td>
                <td>{item[tableHead[1]]}</td>
                <td>{item[tableHead[2]]}</td>
                <td>{item[tableHead[3]]}</td>
                <td>{item[tableHead[4]].getDate().toString().padStart(2, '0') + "/" + (item[tableHead[4]].getMonth()+1).toString().padStart(2, '0') + "/" + item[tableHead[4]].getFullYear().toString()}</td>
                <td>{item[tableHead[5]]}</td>
                <td>{item[tableHead[6]].getDate().toString().padStart(2, '0') + "/" + (item[tableHead[6]].getMonth()+1).toString().padStart(2, '0') + "/" + item[tableHead[6]].getFullYear().toString()}</td>
                <td>{Math.round(item[tableHead[7]]) }</td>
                <td>{new Date(item[tableHead[8]]).getDate().toString().padStart(2, '0') + "/" + (new Date(item[tableHead[8]]).getMonth()+1).toString().padStart(2, '0') + "/" + new Date(item[tableHead[8]]).getFullYear().toString()}</td>
              
                <td>{item[tableHead[9]]}</td>
                <td>{item[tableHead[10]]}</td>             
                <td>{item[tableHead[11]]}</td>
                <td>{new Date(item[tableHead[12]]).getDate().toString().padStart(2, '0') + "/" + (new Date(item[tableHead[12]]).getMonth()+1).toString().padStart(2, '0') + "/" + new Date(item[tableHead[12]]).getFullYear().toString()}</td>
                <td>{item[tableHead[13]]}</td>
                <td>{item[tableHead[14]]}</td>
                <td>{item[tableHead[15]]}</td>


                </tr>
            ))}
          </tbody>
        </table>
      );
}
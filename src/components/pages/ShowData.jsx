import React from 'react'
import { useLocation} from 'react-router-dom';


export default function ShowData(props){
    const location = useLocation()
    console.log(location.state)
    const {userData}=location.state
    console.log(userData[0]) 

   
    const tableHead = ["id","שם","שם משפחה" ,"מין" ,"גיל", "שכר", "אחוז סעיף 14" ,"שווי נכס","הפקדות" , "תשלום מהנכס" ,"השלמה בצ'ק","סיבת עזיבה","וותק",'compensation']



    /*   
    const tableHead = ["id","שם","שם משפחה" ,"מין" ,"תאריך לידה","גיל",
    "תאריך תחילת עבודה", "שכר" ,"תאריך  קבלת סעיף 14", "אחוז סעיף 14" ,"שווי נכס",
    "הפקדות", "תאריך עזיבה" , "תשלום מהנכס" ,"השלמה בצ'ק","סיבת עזיבה","וותק"] */
    console.log('printing the data')
    console.table(userData)

    
    return (
        <table>
          <thead>
        <tr>
          {tableHead.map(roName=> <th key={roName}>{roName}</th>)}
        </tr>
        </thead>
          <tbody>
            {userData.filter(e=> typeof(e['compensation'])!=='NaN' ).map((item) => (
              <tr key={item[tableHead[0]]}>
              <td>{item[tableHead[0]]}</td>
                <td>{item[tableHead[1]]}</td>
                <td>{item[tableHead[2]]}</td>
                <td>{item[tableHead[3]]}</td>
                <td>{item[tableHead[4]]}</td>
                <td>{Math.round(item[tableHead[5]]) }</td>
              
                <td>{item[tableHead[6]]}</td>
                <td>{item[tableHead[7]]}</td>             
                <td>{item[tableHead[8]]}</td>
                <td>{item[tableHead[9]]}</td>
                <td>{item[tableHead[10]]}</td>
                <td>{item[tableHead[11]]}</td>
                <td>{item[tableHead[12]]}</td>
                <td>{new Intl.NumberFormat().format(Math.round(item['compensation'])) }</td>

                </tr>
            ))}
          </tbody>
        </table>
      );
}











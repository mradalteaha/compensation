import React from 'react'
import { useNavigate ,useLocation} from 'react-router-dom';


export default function ShowData(props){
    const location = useLocation()
    const {userData}=location.state
    const tableHead = ["id","שם","שם משפחה" ,"מין" ,"תאריך לידה","גיל",
    "תאריך תחילת עבודה", "שכר" ,"תאריך  קבלת סעיף 14", "אחוז סעיף 14" ,"שווי נכס",
    "הפקדות", "תאריך עזיבה" , "תשלום מהנכס" ,"השלמה בצ'ק","סיבת עזיבה"]

    console.log(userData[0])

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
                <td>{item[tableHead[4]].getDate()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      );
}
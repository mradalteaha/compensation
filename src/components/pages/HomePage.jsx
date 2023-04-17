import React ,{useState} from 'react'
import '../../styles/Homepage.css'
import {utils,read} from 'xlsx';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';


export default function HomePage(props){
    const [selectedFile, setSelectedFile] = useState(null);
    const [Data, setParsedData] = useState(null);
    const navigate = useNavigate();



    const handleFileChange = (event) => {
      setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedFile);
        const file = selectedFile

        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result;
          const workbook = read(data, { type: 'binary',cellDates:true });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = utils.sheet_to_json(sheet);
          // Use jsonData to extract the data
          setParsedData(jsonData)
        //console.log(jsonData)

        };
        const blob = new Blob([file], { type: file.type });
        reader.readAsBinaryString(blob);
      };



      function fixData(){
        console.log(Data)
        const columnsName = Data[0]
        console.log('column names')
        console.log(columnsName)
        const usersArray = Data.slice(1,Data.length)
        console.log('userarray')
        console.log(usersArray)
        
        const mappedArray = usersArray.map( user =>{
            let ob = {}
            for (let name in columnsName) {
                ob[columnsName[name]] = user[name] ? user[name] : 0; 
                
              }
              ob["id"] = user['__EMPTY']
              //fixing the dates
              ob["תאריך לידה"]=new Date(moment(user['__EMPTY_4']).add(1,'hours').toString())
              ob["תאריך תחילת עבודה"] = new Date(moment(ob["תאריך תחילת עבודה"]).add(1,'hours').toString())
              ob["תאריך קבלת סעיף 14"] = new Date(moment(ob["תאריך קבלת סעיף 14"]).add(1,'hours').toString())
              ob["תאריך עזיבה"] = new Date(moment(ob["תאריך עזיבה"]).add(1,'hours').toString())
              ob['גיל'] = Math.floor((new Date().getTime() - Date.parse(ob['תאריך לידה']))/31556952000) //calculate age in years 
              
              //console.log(ob)
              return ob
        })

        
   /*      console.log(mappedArray) */

        navigate('/ShowData',{state:{userData:mappedArray}})
        
       

      }

    return (<div className='container'>
        
        <h1 className='h1'> Hello From HomePage</h1>
      
        <form className='form' onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>

    <button onClick={fixData}> fix function</button>
        
    </div>)

}





 
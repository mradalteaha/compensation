import React ,{useState} from 'react'
import '../../styles/Homepage.css'
import {utils,read} from 'xlsx';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
const startPeriod = '01-01-2023'

export default function HomePage(props){
    const [selectedFile, setSelectedFile] = useState(null);
    const [Data, setParsedData] = useState(null);

    const [testuser, setTest] = useState(null);

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
       /*  console.log('column names')
        console.log(columnsName) */
        const usersArray = Data.slice(1,Data.length)
       /*  console.log('userarray')
        console.log(usersArray) */
        
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
              ob["אחוז סעיף 14"] = ob["אחוז סעיף 14"]!== 0 ? ob["אחוז סעיף 14"]/100 : 0
              ob['גיל'] = Math.round((new Date(startPeriod).getTime() - Date.parse(ob['תאריך לידה']))/31556952000) //calculate age in years
              ob["שכר"] = Math.round(ob["שכר"]) 

              if(ob["סיבת עזיבה"]!== 0){
                ob['וותק'] = Math.round(((new Date(moment(ob["תאריך עזיבה"]).add(1,'hours').toString()).getTime() - Date.parse(ob["תאריך תחילת עבודה"]))/31556952000)/0.5)*0.5
              }else{
                ob['וותק'] = Math.round(((new Date().getTime() - Date.parse(ob["תאריך תחילת עבודה"]))/31556952000)/0.5)*0.5
              } 

              //ob['compensation'] =wrapperFunction(ob)
              
              //console.log(ob)
              return ob
        })

        
/*         console.log(mappedArray[0]) 
 */       
            setTest(mappedArray[16])
            console.log(testuser)
            if(testuser){
              let test  =wrapperFunction(testuser)
              console.log('test value ')
              console.log(test)
            }
         

      // navigate('/ShowData',{state:{userData:mappedArray}})
        
       

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



function wrapperFunction(userob){
 
  if(userob["תאריך עזיבה"] === 0 ){ //for those who left important for part two
    return 0
  }
  const first = firstSection(userob)
  const second = secondSection(userob)
  const third = thirdSection(userob)
  const fourth = forthSection(userob)
  const fifth = fifthSection(userob)
  const sixth = sixthSection(userob)
  let total = 0
  total = first + second +third +fourth+fifth+sixth
  return total

}




function firstSection(userob){
  const lastsalary = userob["שכר"]
  const seniority = userob['וותק']
  const age =userob['גיל']
  const assetsvalue =userob["שווי נכס"]
  const gender = userob["מין"]
  const salarygrowth = 0.02
  const section14rate =userob["אחוז סעיף 14"]
  const userobCopy ={lastsalary,seniority,age,assetsvalue,gender,salarygrowth,section14rate}
  let W = 67;
  let compensation = 0;
  if(gender ==='F'){
    W =64;
  }
  let t=0 
  for( t=0 ;t<(W-age-2); t++){
    compensation = compensation +((lastsalary*seniority*(1-section14rate))*((Math.pow((1+salarygrowth),t+0.5)*getPx(t,userobCopy)*firedPropelityQ1(age +t))/(Math.pow((1+getDiscountRate(t)),t+0.5))))
  }
  console.log('first compensation')
  console.log(compensation)
  return compensation

}


function secondSection(userob){
  const lastsalary = userob["שכר"]
  const seniority = userob['וותק']
  const age =userob['גיל']
  const assetsvalue =userob["שווי נכס"]
  const gender = userob["מין"]
  const salarygrowth = 0.02
  const section14rate =userob["אחוז סעיף 14"]
  const userobCopy ={lastsalary,seniority,age,assetsvalue,gender,salarygrowth,section14rate}
  let W = 67;
  let compensation = 0;
  if(gender ==='F'){
    W =64;
  }
  let t=0 
  const LSS =(lastsalary*seniority*(1-section14rate))

  for( t=0 ;t<(W-age-2); t++){
    compensation = compensation +((LSS)*((Math.pow((1+salarygrowth),t+0.5)*getPx(t,userobCopy)*deathPropelityQ3(age +t,gender))/(Math.pow((1+getDiscountRate(t)),t+0.5))))
  }

  console.log('second compensation')
  console.log(compensation)

  return compensation

}


function thirdSection(userob){
  const lastsalary = userob["שכר"]
  const seniority = userob['וותק']
  const age =userob['גיל']
  const assetsvalue =userob["שווי נכס"]
  const gender = userob["מין"]
  const salarygrowth = 0.02
  const section14rate =userob["אחוז סעיף 14"]
  const userobCopy ={lastsalary,seniority,age,assetsvalue,gender,salarygrowth,section14rate}
  let W = 67;
  let compensation = 0;
  if(gender ==='F'){
    W =64;
  }
  let t=0 
  for( t=0 ;t<(W-age-2); t++){
    compensation = compensation +((assetsvalue)*getPx(t,userobCopy)*resignationPropelityQ2(age +t))
  }
  console.log('third')
  console.log(compensation)
  return compensation

}

function forthSection(userob){
  let W = 67;
  const lastsalary = userob["שכר"]
  const seniority = userob['וותק']
  const age =userob['גיל']
  const assetsvalue =userob["שווי נכס"]
  const gender = userob["מין"]
  const salarygrowth = 0.02
  const section14rate =userob["אחוז סעיף 14"]
  const userobCopy ={lastsalary,seniority,age,assetsvalue,gender,salarygrowth,section14rate}

  let compensation = 0;
  if(gender ==='F'){
    W =64;
  }

  /* console.log('printing variables ')
  console.log('lastS , seniority , age , gender , salarygrowth ,')
  console.log(lastsalary,seniority ,age , gender , salarygrowth) */

  const LSS =(lastsalary*seniority*(1-section14rate))
 
  compensation = (LSS*((Math.pow((1+salarygrowth),W-age+0.5)*getPx(W-age-1,userobCopy)*firedPropelityQ1(W-1))/(Math.pow((1+getDiscountRate(0)),W-age+0.5))))
  console.log('forth compensation')
  console.log(compensation)
  return compensation

}



function fifthSection(userob){
  let W = 67;
  const lastsalary = userob["שכר"]
  const seniority = userob['וותק']
  const age =userob['גיל']
  const assetsvalue =userob["שווי נכס"]
  const gender = userob["מין"]
  const salarygrowth = 0.02
  const section14rate =userob["אחוז סעיף 14"]
  const userobCopy ={lastsalary,seniority,age,assetsvalue,gender,salarygrowth,section14rate}
  let compensation = 0;
  if(gender ==='F'){
    W =64;
  }

  const LSS =(lastsalary*seniority*(1-section14rate))
 
  compensation = (LSS*((Math.pow((1+salarygrowth),W-age+0.5)*getPxx(W-1,userobCopy)*firedPropelityQ1(W-1))/(Math.pow((1+getDiscountRate(0)),W-age+0.5))))+(assetsvalue * getPx(W-age-1,userobCopy) * resignationPropelityQ2(W-1) )
  console.log('fifth compensation')
  console.log(compensation)

  return compensation

}

function sixthSection(userob){
  const lastsalary = userob["שכר"]
  const seniority = userob['וותק']
  const age =userob['גיל']
  const assetsvalue =userob["שווי נכס"]
  const gender = userob["מין"]
  const salarygrowth = 0.02
  const section14rate =userob["אחוז סעיף 14"]
  const userobCopy ={lastsalary,seniority,age,assetsvalue,gender,salarygrowth,section14rate}
  let W = 67;
  let compensation = 0;
  if(gender ==='F'){
    W =64;
  }

  const LSS =(lastsalary*seniority*(1-section14rate))

  compensation = (LSS*((Math.pow((1+salarygrowth),W-age)*getPxx(W-1,userobCopy)*(1- firedPropelityQ1(W-1) - resignationPropelityQ2(W-1) - deathPropelityQ3(W-1) ))/(Math.pow((1+getDiscountRate(W-age-1)),W-age))))
  
  console.log('sixth compensation')
  console.log(compensation)
  return compensation

}



function getPx(t,userob){
  if(t === 0){
    return 1
  }
  const {age ,gender } =userob
  const deathProp = deathPropelityQ3(age+t,gender)
  const firedProp = firedPropelityQ1(age+t)
  const resignation = resignationPropelityQ2(age+t)

  /* console.log('getPx')
  console.log(deathProp ,firedProp , resignation)  */
  let p = 1 -deathProp -firedProp - resignation
  return p;
  
}
 
function getPxx(t,userob){
  if(t === 0){
    return 1
  }
  const {age ,gender } =userob
  const deathProp = deathPropelityQ3(t,gender)
  const firedProp = firedPropelityQ1(t)
  const resignation = resignationPropelityQ2(t)

  /* console.log('getPx')
  console.log(deathProp ,firedProp , resignation)  */
  let p = 1 -deathProp -firedProp - resignation
  return p;
  
}
//get discount rate of the year
function getDiscountRate(t){
 /*  console.log('discount rate')
  console.log(t) */
  const discount = [0.0181,0.0199,0.0211,0.0221,0.0230,0.0239,0.0246,0.0253,0.0260,0.0267,0.0274,0.0280,0.0286,0.0292,0.0299,0.0305,0.0311,0.0317,0.0323,0.0329,0.0335,0.0341,0.0348,0.0354,0.0360,0.0366,0.0372,0.0378,0.0384,0.0391,0.0397,0.0403,0.0409,0.0415,0.0421,0.0427,0.0434,0.0440,0.0446,0.0452,0.0458,0.0464,0.0470,0.0476,0.0483,0.0489,0.0495]
  
    return discount[t]
}

//returns the properlty to get fired
function firedPropelityQ1(age){

  if(age>=18 && age <= 29){
    return 0.07
  }
  else if(age>=30 && age <= 39){
    return 0.05
  }
  else if(age>=40 && age <= 49){
    return 0.04
  }
  else if(age>=50 && age <= 59){
    return 0.03
  }
  return 0.02
}


//returns the properlty to resignation
function resignationPropelityQ2(age){

  if(age>=18 && age <= 29){
    return 0.2
  }
  else if(age>=30 && age <= 39){
    return 0.13
  }
  else if(age>=40 && age <= 49){
    return 0.1
  }
  else if(age>=50 && age <= 59){
    return 0.07
  }
  return 0.03
}

//returns the properlty to die
function deathPropelityQ3(age,gender){
  const index = age-18
  const q3M=[0.000140,0.000155,0.000166,0.000176,0.000182,0.000187,0.000190,0.000191,0.000192,0.000192,0.000193,0.000196,0.000200,0.000205,0.000213,0.000223,0.000234,0.000246,0.000261,0.000279,0.000300,0.000324,0.000353,0.000390,0.000430,0.000477,0.000530,0.000587,0.000649,0.000717,0.000790,0.000872,0.000961,0.001062,0.001175,0.001302,0.001445,0.001604,0.001778,0.001967,0.002175,0.002401,0.002647,0.002909,0.003185,0.003475,0.003774,0.004085,0.004407,0.008113,0.008957,0.009874,0.010869,0.011945,0.013236,0.014654,0.016368,0.018447,0.020677,0.023612,0.027641,0.032286,0.037575,0.043838,0.050852,0.058666,0.067313,0.076832,0.087263,0.098645,0.111019,0.124413,0.138893,0.154491,0.170162,0.185534,0.201369,0.217557,0.234041,0.250693,0.267389,0.284001,0.301638,0.320365,0.340212,0.361319,0.383728,0.407519,0.430880,0.455580,0.481697,0.509311,1.000000]
  const q3F=[0.000045,0.000049,0.000051,0.000055,0.000059,0.000063,0.000066,0.000071,0.000076,0.000080,0.000082,0.000085,0.000089,0.000093,0.000096,0.000102,0.000108,0.000114,0.000123,0.000133,0.000144,0.000158,0.000173,0.000192,0.000213,0.000237,0.000262,0.000291,0.000322,0.000357,0.000395,0.000437,0.000483,0.000533,0.000589,0.000650,0.000716,0.000788,0.000865,0.000949,0.001040,0.001137,0.001240,0.001350,0.001466,0.001587,0.002723,0.003132,0.003642,0.004232,0.004912,0.005699,0.006606,0.007652,0.008848,0.010303,0.011900,0.013842,0.015746,0.018052,0.020694,0.023737,0.027247,0.031596,0.036651,0.042533,0.049293,0.057019,0.065777,0.075663,0.086746,0.099229,0.113196,0.126997,0.142238,0.159050,0.177498,0.197745,0.219823,0.245017,0.268079,0.284614,0.302162,0.320821,0.340591,0.361574,0.383882,0.407519,0.430880,0.455580,0.481697,0.509311,1.000000]
 
  if(gender === 'F'){
    return q3F[index]
  }
  return q3M[index] 
  


}



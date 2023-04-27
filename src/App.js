import './App.css';
import HomePage from './components/pages/HomePage';
import { Routes,Route } from "react-router-dom";
import Heading from './components/common/Heading';
import ShowData from './components/pages/ShowData';
import Test from './components/pages/Test';

function App() {


  return (
    <Routes>
    <Route path="/" element={<><Heading/><Test/>  </>}/>
      <Route path="/" element={<><Heading/><HomePage/>  </>}/>
      <Route path="/ShowData" element={<><Heading/><ShowData/>  </>}/>
    </Routes>
  );
}

export default App;
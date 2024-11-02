import './App.css';
import ButtonAppBar from './Component/Headbar';
import BasicSelect from './Component/Selectchoice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BisectionMethod from './Allpage/Bisection';
import Falseposition from './Allpage/Falseposition';
import GraphicalMethod from './Allpage/Graphical';
import SecantMethod from './Allpage/Secant';
import OnepointIter from './Allpage/Onepoint';
import NewtonRaphson from './Allpage/NewtonRaphson';
import CramerRule from './Allpage/Cramer';
import LinearSpline from './Allpage/LinearSpline';

function App() {

  return (
    
    <div>
        
        <BrowserRouter>

              <ButtonAppBar/>
              <BasicSelect/>

              <Routes>
                 
                  <Route path='/Bisection' element={<BisectionMethod />} />
                  <Route path='/Falseposition' element={<Falseposition />} />
                  <Route path='/Graphical' element={<GraphicalMethod />}/>
                  <Route path='/Secant' element={<SecantMethod />}/> 
                  <Route path='/OnepointIteration' element={<OnepointIter />}/> 
                  <Route path='/NewtonRaph' element={<NewtonRaphson />}/>
                  <Route path='/CramersRule' element={<CramerRule />}/>
                  <Route path='/LinearSpline' element={<LinearSpline />}/>
                  
              </Routes>

        </BrowserRouter>

    </div>

  );
}

export default App;

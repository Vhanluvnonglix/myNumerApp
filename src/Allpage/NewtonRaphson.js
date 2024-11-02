import React from 'react';
import { useState } from 'react';
import { evaluate } from 'mathjs';
import '../Allpage/allpage.css';
import Plot from 'react-plotly.js';
import { derivative } from 'mathjs';

const NewtonRaphson =()=>{

    const [data, setData] = useState([]);
    const [chart, setChart] = useState([]);
    const [error, setError] = useState(0.000001);
    const [x, setX] = useState(0);
    const [Xl, setXl] = useState(0);
    const [Equation, setEquation] = useState("");

    const Error=(xold, xnew) => Math.abs((xnew-xold)/xnew)*100;

    const CalNewtonRaph = (xl) => {
        var xm, fxm, fxmpime, ea;
        var MAX = 50;
        var iter = 0;
        const e = 0.000001;
        var newData = [];
        var dataChart = [];
    
        xm = xl;

        const Function = (x1) => evaluate(Equation, { x: x1 });
        const Derive = (x1) => evaluate(derivative(Equation, 'x').toString(), { x: x1 });
    
        do {
            fxm = Function(xm);
            fxmpime = Derive(xm);
    
            if (fxmpime == 0) {
                console.error("Invalid derivative value");
                return;
            }
    
            const Newxm = xm - fxm / fxmpime;
            ea = Error(xm, Newxm);
            xm = Newxm;
    
            iter++;
            newData.push({
                iteration: iter,
                Xm: xm,
                Xl: xl,
            });
    
            dataChart.push({
                iteration: iter,
                Xm: xm,
            });
    
        } while (ea > e && iter < MAX);
    
        setData(newData);
        setChart(dataChart);
        setX(xm);
    }
    
    const inputEquation=(event)=>{
        setEquation(event.target.value);
    }

    const inputXl=(event)=>{
        setXl(event.target.value);
    }

    const CalculateRoot=()=>{
        const xlnum = parseFloat(Xl);
        CalNewtonRaph(xlnum);
    }

    const ShowChart = {
        data:[{
            type: "scatter",
            mode: "markers+lines",
            x: chart.map((point)=>point.iteration),
            y: chart.map((point)=>point.Xm),
            marker: {color: "blue"},
            line: {color: "blue"},
            name: "Newton Rapshon",
        }],
        layout: {
            xaxis: {
                title: "Iteration",
                zeroline: true,
            },
            yaxis: {
                title: "Root (Xm)",
                zeroline: true,
            }
        }
    }

    return(
        <div>
            <div className="Bigcontainer">
                <div className="IpEquation">
                    <div className="P">
                        <p>f(x) : {Equation}</p>
                    </div>
                    <div className="InputEq">
                        <input 
                            type="text"
                            value={Equation}
                            onChange={inputEquation}
                        />
                    </div>
                </div>
            </div>

            <div className="InputX">
                <div className="InputGroup">
                    <div className="InputItem1">
                        <label>X : </label>
                        <input 
                            type="number"
                            value={Xl}
                            onChange={inputXl}
                        />
                    </div>
                </div>
            </div>

            <div className="Cal">
                <button className="btn" onClick={CalculateRoot}>Calculate</button>
            </div>

            <div className="Cal">
                <p>Answer : {x}</p>
            </div>

            <div>
                {data.length > 0 && (
                    <div className="TableCon">
                        <table>
                            <thead>
                                <tr>
                                    <th data-label="Iteration">Iteration</th>
                                    <th data-label="XL">XL</th>
                                    <th data-label="XM">XM</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((element, index) =>(
                                    <tr key={index}>
                                        <td data-label="Iteration">{element.iteration}</td>
                                        <td data-label="Xl">{element.Xl}</td>
                                        <td data-label="xm">{element.Xm}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="showchart">
                <div className="gContainer">
                    <Plot
                        data={ShowChart.data}
                        layout={{
                            ...ShowChart.layout,
                            autosize: true,
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>
        </div>
    );
}

export default NewtonRaphson

import { useState } from "react";
import React from "react";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js";
import '../Allpage/allpage.css';

const GraphicalMethod=()=>{
    const [data, setData] = useState([]);
    const [chart, setChart] = useState([]);
    const [error, setError] = useState(0.000001);
    const [Xl, setXl] = useState(0);
    const [x, setX] = useState(0);
    const [Xr, setXr] = useState(0);
    const [Equation, setEquation] = useState("");

    const Error=(eq, xValue)=>{
        if(eq && !isNaN(xValue)){
            const scope = {
                x: xValue
            }
            return evaluate(eq, scope)
        }
    }

    const Calbisection =(xl, xr)=>{
        var y, z;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var newData = [];
        var dataChart = [];
    
        for(var x=xl; x<xr; x+=0.01){
            const fx = Error(Equation, x);
            const fx1 = Error(Equation, x + 0.01);
    
            if (fx * fx1 < 0) {
                y = x;
                z = x + 0.01;
                break;
            }
        }
    
        do {
            const fy = Error(Equation, y);
            const fyPlusEpsilon = Error(Equation, y + e);
    
            if (fy * fyPlusEpsilon < 0) {
                break;
            }

            dataChart.push({
                iteration: iter,
                Xm: y 
            });
    
            y += e;
            iter++;
            newData.push({
                iteration: iter,
                Xl: xl,  
                Xm: y,   
                Xr: xr   
            });

        } while (y <= z && iter < MAX);
        setData(newData); 
        setX(y); 
        setChart(dataChart);
    }    

    const inputEquation=(event)=>{
        setEquation(event.target.value);
    }

    const inputXl=(event)=>{
        setXl(event.target.value);
    }

    const inputXr=(event)=>{
        setXr(event.target.value);
    }

    const CalculateRoot =()=>{
        const xlnum = parseFloat(Xl);
        const xrnum = parseFloat(Xr);
        Calbisection(xlnum, xrnum);
    }

    const ShowChart = {
        data: [{
                type: "scatter",
                mode: "markers+lines",
                x: chart.map((point) => point.iteration),
                y: chart.map((point) => point.Xm), 
                marker: {color: "blue"},
                line: {color: "blue"},
                name: "Graphical Method",
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
    
    return (
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
                        <label>XL :</label>
                        <input 
                            type="number"
                            value={Xl}
                            onChange={inputXl}
                        />
                    </div>
                    <div className="InputItem2">
                        <label>XR :</label>
                        <input 
                            type="number"
                            value={Xr}
                            onChange={inputXr}
                        />
                    </div>
                </div>
            </div>

            <div className="Cal">
                <button className="btn" onClick={CalculateRoot}>Calculate</button>
            </div>

            <div className="Cal">
                <p>Answer : {x} </p>
            </div>

            <div>
                {data.length > 0 && (
                    <div className="TableCon">
                        <table>
                            <thead>
                                <tr>
                                    <th data-label="Iteration">Iteration</th>
                                    <th data-label="Xl">XL</th>
                                    <th data-label="Xm">XM</th>
                                    <th data-label="Xr">XR</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((element, index)=>(
                                    <tr key={index}>
                                        <td data-label="Iteration">{element.iteration}</td>
                                        <td data-label="Xl">{element.Xl}</td>
                                        <td data-label="Xm">{element.Xm}</td>
                                        <td data-label="Xr">{element.Xr}</td>
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

export default GraphicalMethod
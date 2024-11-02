import React from "react";
import { useState } from "react";
import { evaluate } from "mathjs";
import '../Allpage/allpage.css';
import Plot from "react-plotly.js";

const Falseposition=()=>{

    const [data, setData] = useState([]);
    const [chart, setChart] = useState([]);
    const [error, setError] = useState(0.000001);
    const [Equation, setEquation] = useState("");
    const [x, setX] = useState(0);
    const [Xl, setXl] = useState(0);
    const [Xr, setXr] = useState(0);

    const Calfalseposition=(xl, xr)=>{

        const Error=(xold, xnew)=>Math.abs((xnew-xold)/xnew)*100;

        var fX, fXr, fXl, x, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var newData = [];
        var dataChart = [];
        do{

            scope = {
                x:xl,
            }
            fXl = evaluate(Equation, scope)

            scope = {
                x:xr,
            }
            fXr = evaluate(Equation, scope)

            x = (xl*fXr - xr*fXl) / (fXr - fXl);

            scope = {
                x:x,
            }
            fX = evaluate(Equation, scope)

            iter++;
            if(fX*fXr > 0){
                ea = Error(xr, x);
                newData.push({
                    iteration:iter,
                    Xl: xl,
                    X: x,
                    Xr: xr
                })
                xr = x;
                
            }else if(fX*fXr < 0){
                ea = Error(xl, x);
                newData.push({
                    iteration:iter,
                    Xl: xl,
                    X: x,
                    Xr: xr
                })
                xl = x;
            }

            dataChart.push({
                iteration: iter,
                X: x
            });

        }while(ea > e && iter<MAX)
        setData(newData)
        setX(x)
        setChart(dataChart)
    }

    const inputEquation=(event)=>{
        setEquation(event.target.value)
    }

    const inputXl=(event)=>{
        setXl(event.target.value)
    }

    const inputXr=(event)=>{
        setXr(event.target.value)
    }

    const calculateRoot=()=>{
        const xlnum = parseFloat(Xl);
        const xrnum = parseFloat(Xr);
        Calfalseposition(xlnum, xrnum);
    }

    const showChart = {
        data:[{
            type: "scatter",
            mode: "markers+lines",
            x: chart.map((point)=>point.iteration),
            y: chart.map((point)=>point.X),
            marker: {color: "blue"},
            line: {color: "blue"},
            name: "False Position Method",
        }],
        layout:{
            xaxis:{
                title: "Iteration",
                zeroline: true,
            },
            yaxis:{
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
                        <label>XL : </label>
                        <input 
                            type="number"
                            value={Xl}
                            onChange={inputXl}
                        />
                    </div>

                    <div className="InputItem2">
                        <label>XR : </label>
                        <input 
                            type="number"
                            value={Xr}
                            onChange={inputXr}
                        />
                    </div>
                </div>
            </div>

            <div className="Cal">
                <button className="btn" onClick={calculateRoot}>Calculate</button>
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
                                    <th data-label="Xl">XL</th>
                                    <th data-label="Xm">X</th>
                                    <th data-label="Xr">XR</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data.map((element, index) => (
                                    <tr key={index}>
                                        <td data-label="Iteration">{element.iteration}</td>
                                        <td data-label="Xl">{element.Xl}</td>
                                        <td data-label="Xm">{element.X}</td>
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
                        data={showChart.data}
                        layout={{
                            ...showChart.layout,
                            autosize: true,
                        }}
                        style={{width:'100%', height: '100%'}}
                    />
                </div>
            </div>
        </div>
    );

}

export default Falseposition
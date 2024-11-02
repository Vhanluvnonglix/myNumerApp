import React, { useState } from "react";
import { evaluate } from "mathjs";
import '../Allpage/allpage.css';
import Plot from "react-plotly.js";

const SecantMethod = () => {

    const [data, setData] = useState([]);
    const [chart, setChart] = useState([]);
    const [Equation, setEquation] = useState("");
    const [Xl, setXl] = useState(0);
    const [Xr, setXr] = useState(0);
    const [x, setX] = useState(0);
    const [error, setError] = useState(0.000001);

    const Error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calsecant = (xl, xr) => {
        var xm, fxm, fxr, fxl, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var newData = [];
        var dataChart = [];

        do {
            scope = {
                x: xl,
            }
            fxl = evaluate(Equation, scope);

            scope = {
                x: xr,
            }
            fxr = evaluate(Equation, scope);

            xm = xr - (fxr * (xr - xl)) / (fxr - fxl);
            ea = Error(xr, xm);
            iter++;

            newData.push({
                iteration: iter,
                Xl: xl,
                Xm: xm,
                Xr: xr
            });

            dataChart.push({
                iteration: iter,
                Xm: xm
            });

            xl = xr;
            xr = xm;
        } while (ea > e && iter < MAX);

        setData(newData);
        setX(xm);
        setChart(dataChart);
    }

    const inputEquation = (event) => {
        setEquation(event.target.value);
    }

    const inputXl = (event) => {
        setXl(event.target.value);
    }

    const inputXr = (event) => {
        setXr(event.target.value);
    }

    const CalculateRoot = () => {
        const xlnum = parseFloat(Xl);
        const xrnum = parseFloat(Xr);
        if (!isNaN(xlnum) && !isNaN(xrnum)) {
            Calsecant(xlnum, xrnum);
        } else {
            alert("Please enter valid numbers for XL and XR");
        }
    }

    const showChart = {
        data:[{
            type: "scatter",
            mode: "markers+lines",
            x: chart.map((point)=>point.iteration),
            y: chart.map((point)=>point.Xm),
            marker: {color: "blue"},
            line: {color: "blue"},
            name: "Secant Method"
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
                        <p>f(x) : {Equation} </p>
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
                                {data.map((element, index) => (
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
                        data={showChart.data}
                        layout={{
                            ...showChart.layout,
                            autosize: true,
                        }}
                        style={{width:'100%', height:'100%'}}
                    />
                </div>
            </div>

        </div>
    );
}

export default SecantMethod;

import { useState } from "react";
import { evaluate } from "mathjs";
import '../Allpage/allpage.css';
import Plot from "react-plotly.js";

const OnepointIter = () => {

    const [data, setData] = useState([]);
    const [chart, setChart] = useState([]);
    const [x, setX] = useState(0);
    const [Xl, setXl] = useState(0);
    const [Equation, setEquation] = useState("");
    const [error, setError] = useState(0.000001);

    const Error = (xold, xnew) => Math.abs((xnew - xold) / xnew) * 100;

    const Calonepoint = (xl) => {
        var xm, fxm, ea, scope;
        var iter = 0;
        var MAX = 50;
        const e = 0.000001;
        var newData = [];
        var dataChart = [];

        xm = xl; 

        do {
            scope = { x: xm };
            fxm = evaluate(Equation, scope);

            ea = Error(fxm, xm);
            xm = fxm;

            iter++;

            newData.push({
                iteration: iter,
                Xl: xl,
                Xm: xm
            });

            dataChart.push({
                iteration: iter,
                Xm: xm
            })

        }while (ea>error && iter<MAX);

        setData(newData);
        setChart(dataChart);
        setX(xm);
    }

    const inputEquation = (event) => {
        setEquation(event.target.value);
    }

    const inputXl = (event) => {
        setXl(event.target.value);
    }

    const CalculateRoot = () => {
        const xlnum = parseFloat(Xl);
        Calonepoint(xlnum);
    }

    const showChart = {
        data:[{
            type: "scatter",
            mode: "markers+lines",
            x: chart.map((point)=>point.iteration),
            y: chart.map((point)=>point.Xm),
            marker: {color: "blue"},
            line: {color: "blue"},
            name: "Onepoint Iteration",
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
                                {data.map((element, index) => (
                                    <tr key={index}>
                                        <td data-label="Iteration">{element.iteration}</td>
                                        <td data-label="Xl">{element.Xl}</td>
                                        <td data-label="XM">{element.Xm}</td>
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
                        data = {showChart.data}
                        layout={{
                            ...showChart.layout,
                            autosize: true,
                        }}
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
            </div>

        </div>
    );
}

export default OnepointIter

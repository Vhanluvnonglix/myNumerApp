import React from "react";
import { useState } from "react";
import 'katex/dist/katex.min.css';
import { BlockMath } from "react-katex";

function LinearSpline() {
    const [size, setSize] = useState(1);
    const [valueX, setValueX] = useState(0);
    const [xValues, setXValues] = useState(Array(3).fill(0));
    const [fx, setFx] = useState(Array(3).fill(0));
    const [step, setStep] = useState([]);

    const inputSize = (event) => {
        const size = parseInt(event.target.value);
        setSize(size);
        setXValues(Array(size).fill(0));
        setFx(Array(size).fill(0))
    }

    const inputX = (event) => {
        setValueX(event.target.value);
    }

    const XChange = (index, value) => {
        const updateX = [...xValues]
        updateX[index] = parseFloat(value)
        setXValues(updateX)
    }

    const FxChange = (index, value) => {
        const updateFx = [...fx]
        updateFx[index] = parseFloat(value)
        setFx(updateFx)
    }

    const CalLinearSpline = () => {
        const n = size
        let StepsArray = []
        let result = 0

        for (let i = 0; i < n - 1; i++) {
            if (valueX >= xValues[i] && valueX <= xValues[i + 1]) {
                const slope = (fx[i + 1] - fx[i]) / (xValues[i + 1] - xValues[i]);
                StepsArray.push(`m = \\frac{f(x_{${i + 1}}) - f(x_{${i}})}{x_{${i + 1}} - x_{${i}}} = \\frac{${fx[i + 1]} - ${fx[i]}}{${xValues[i + 1]} - ${xValues[i]}} = ${slope}`);
                result = fx[i] + (slope * (valueX - xValues[i]));
                StepsArray.push(`f(${valueX}) = f(x_{${i}}) + m \\cdot (x - x_{${i}})`);
                StepsArray.push(`f(${valueX}) = ${fx[i]} + ${slope} \\cdot (${valueX} - ${xValues[i]}) = ${result}`);

                console.log(result);
                break;
            }
        }
        setStep(StepsArray)
    }

    return (

        <div>
            <div className='LinearContainer'>
                <div className='Input'>
                    <div className='InputGroup'>
                        <div className='Input-Item1'>
                            <label>Points : </label>
                            <input
                                type="number"
                                value={size}
                                onChange={inputSize}
                            />
                        </div>

                        <div className='InputI-Item2'>
                            <label>X : </label>
                            <input
                                type="number"
                                value={valueX}
                                onChange={inputX}
                            />
                        </div>
                    </div>
                </div>
                    
                <div className='checkbox-group'>
                    {Array.from({ length: size }, (_, i) => (
                        <div key={i}>
                            <span>{i + 1} .</span>
                            <input
                                type="number"
                                value={xValues[i]}
                                onChange={(e) => XChange(i, e.target.value)}
                                placeholder={`x${i}`}
                                />
                                <input
                                    type="number"
                                    value={fx[i]}
                                    onChange={(e) => FxChange(i, e.target.value)}
                                    placeholder={`f(x${i})`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className='calbi'>
                        <button className="btn btn-neutral btn-sm" onClick={CalLinearSpline}>
                            Calculate
                        </button>
                    </div>
                </div>
                {step.length > 0 && (
                    <div className='table-container'>
                        {step.map((step, idx) => (
                            <div key={idx} className='calculation-step'>
                                <BlockMath key={idx} math={step} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        
    );
}

export default LinearSpline;

import { useState } from "react";
import { evaluate } from "mathjs";
import React from "react";
import { det } from "mathjs";
import 'katex/dist/katex.min.css'
import '../Allpage/allpage.css';

const CramerRule=()=>{

    const [constants, setConstants] = useState(Array(3).fill(null));
    const [dimitions, setDimitions] = useState(3);
    const [matrix, setMatrix] = useState(Array(3).fill().map(() => Array(3).fill(null)))
    const [data, setData] = useState([])

    const inputSize=(event)=>{
        const Size = parseInt(event.target.value)
        setDimitions(Size)
        setMatrix(Array(Size).fill().map(()=>Array(Size).fill(null)))
        setConstants(Array(Size).fill(0))
    }

    const MatrixChange=(row, col, value)=>{
        const newMatrix = [...matrix]
        newMatrix[row][col] = parseFloat(value)
        setMatrix(newMatrix)
    }

    const ConstantsChange =(row, value)=>{
        const newConstants = [...constants]
        newConstants[row] = parseFloat(value)
        setConstants(newConstants)
    }

    const replaceMatrix=(a,b,j)=>{
        const newMatrix1 = a.map((row, rowindex)=>[...row])
        for(let i=0; i<newMatrix1.length; i++){
            newMatrix1[i][j] = constants[i]
        }
        return newMatrix1
    }

    const CalCarmer=(n,a,b)=>{
        const detA = det(a)
        var newData = []

        if(detA == 0){
            setData([{ Xn: "Invalid! DetA = 0" }])
            return 
        }

        for (let i = 0; i < n; i++) {
            const newMatrix2 = replaceMatrix(a, b, i)
            const detAi = det(newMatrix2)
            const result = (detAi / detA)

            const detA_latex = `\\text{det (A)} = ${detA.toFixed(2)}`;
            
            newData.push({
                Xn: result,
                detA_latex,
            })
        }
        setData(newData)
    }

    const CalculateCramer=()=>{
        CalCarmer(dimitions, matrix, constants)
    }

    const ResetAll = () => {
        setDimitions(3);
        setMatrix(Array.from({ length: 3 }, () => Array(3).fill("")));  
        setConstants(Array(3).fill(""));  
        setData([]);  
    }

    return (
        <div>
            <div className="ContainerCramer">
                <div className="InputSet">
                    <div className="pCramer">
                        <p>Matrix Size : </p>
                    </div>
                    <div className="InputSize">
                        <input 
                            type="number"
                            value={dimitions}
                            onChange={inputSize}
                        />
                    </div>

                    <div>
                        <button className="btnReset" onClick={ResetAll}>Reset</button>
                    </div>
                    <div>
                        <button className="btnCal" onClick={CalculateCramer}>Calculate</button>
                    </div>
                </div>

                <div className="ContainerBox">
                    {dimitions > 0 && (
                        <div>
                            <div className='InputMatrix'>
                                <h3>Input Matrix</h3>
                            </div>

                            {matrix.map((row, rowIndex) => (
                                <div key={rowIndex} className='matrix-row'>
                                    {row.map((value, colIndex) => (
                                        <input
                                            key={colIndex}
                                            type="number"
                                            value={matrix[rowIndex][colIndex]}
                                            onChange={(e) => MatrixChange(rowIndex, colIndex, e.target.value)}
                                            className="matrix-input"
                                            />
                                        ))}
                                        <span>=</span>

                                        <input
                                            type="number"
                                            value={constants[rowIndex]}
                                            onChange={(e) => ConstantsChange(rowIndex, e.target.value)}
                                            className="constants-input"
                                        />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div>
                {data.length > 0 && (
                    <div className='Answer-container'>
                        <h3>Cramer's Rule Answer : </h3>
                        <p>det(A) = {det(matrix).toFixed(2)}</p>
                        {data.map((res, idx) => (
                            <div key={idx} className='calculation-step'>
                                <div className='result'>
                                    <h5>X{idx + 1} = {typeof res.Xn === 'number' ? res.Xn.toFixed(2) : 'N/A'}</h5>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default CramerRule
import React, { useState, useEffect } from 'react'
import Canvas from './Canvas'
const wasm = import ('../wasm/square.wasm')

const App = () => {
    var square
    useEffect( () => {
        wasm.then(wasm => {
            square = wasm._Z6squarei
            console.log(square(4));    
        })
    }, [])
    const [val, setVal] = useState('')
    const handleClick = () => {
        console.log('clicked');
        if(val === ''){
            document.getElementById('output').innerHTML = "Input a number pls"
        }else{
            setVal('')
            const num = parseInt(val)
            var sq
            wasm.then(wasm => {
                const square = wasm._Z6squarei
                sq = square(num)
                document.getElementById('output').innerHTML = sq
            })
        }
    }
    return ( 
        <div>
            <h1>My React App!!!</h1>
            <Canvas height={500} width={500} />
            <br/>
            Input: 
            <input type="text" value = { val } onChange = {(e) => {
                    e.persist()
                    setVal(preVal => e.target.value)
                }
            }
            />
            <button onClick = { handleClick }>Square</button>
            <p id='output'></p>
        </div>
     );
}
 
export default App;
import React, {useState, useEffect} from 'react';
import './Main.css';
import Grid from './Grid';

const Main = () => {

    let speed = 100;
    let rows = 30;
    let cols = 50;

    const [generations, setGenerations] = useState(-1);
    const [gridFull, setGridFull] = useState(Array(rows).fill().map(() => Array(cols).fill(false)));

    const selectBox = (row, col) => {
        let gridCopy = arrayClone(gridFull);
        gridCopy[row][col] = !gridCopy[row][col];
        setGridFull(gridCopy);
    }

    const seed = () => {
        let gridCopy = arrayClone(gridFull);
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                if (Math.floor(Math.random() * 4) === 1) {
                    gridCopy[i][j] = true;
                }
            }
        }
        setGridFull(gridCopy)
    }

    const playButton = () => {        
        let intervalID = setInterval(play, speed)
        //clearInterval(intervalID)
    }

    const play = () => {
        let g = gridFull;
        let g2 = arrayClone(gridFull)

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let count = 0;
                if (i > 0) if (g[i - 1][j]) count++;
                if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
                if (i > 0 && j < cols - 1) if (g[i - 1][j + 1]) count++;
                if (j < cols - 1) if (g[i][j + 1]) count++;
                if (j > 0) if (g[i][j - 1]) count++;
                if (i < rows - 1) if (g[i + 1][j]) count++;
                if (i < rows - 1 && j > 0) if (g[i + 1][[j - 1]]) count++;
                if (i < rows - 1 && cols - 1) if (g[i + 1][j + 1]) count++;
                if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
                if (!g[i][j] && count === 3) g2[i][j] = true; 
            }
        }
        setGridFull(g2);
        setGenerations(generations + 1)
    }

    function arrayClone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    useEffect(() => {
        setGenerations(0);       
        seed();
        playButton(); 
    }, []);  

    return (
        <div className="container">
            <h1>Eddie Madrigal's Version of Game of Life</h1>
            <h2>Generations: {generations}</h2>
            <Grid   
                gridFull={gridFull} setGridFull={setGridFull}
                rows={rows}
                cols={cols}
                selectBox={selectBox}
            />
            <p>Speed: {speed}</p>
            
        </div>
    )
}



export default Main;
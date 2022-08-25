import React, {useEffect, useState} from "react";
import styled from "styled-components";

const StyledSquare = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => {
        if (props.status === "dead") {
            return "grey";
        } else if (props.clicked && props.status === "live") {
            return "green";
        } else {
            return "white";
        }
    }};
`;
    
const StyledSquares = styled.div`
    display: flex;
    flex-direction: row;
    width: 400px;
    margin: 100px;
`;

const Square = ({id, setFighter, status, isClicked}) => {
    
    const handleClick = (id) => {
        setFighter(id);
    }

    return(
        <StyledSquare id={id} onClick={() => handleClick(id)} clicked={isClicked} status={status} >
            <div className="title">Square</div>
        </StyledSquare>
    )
}

export const Squares = () => {
    const grid = 4;
    const [fighters, setFighters] = useState([]);
    const [loosers, setLoosers] = useState([]);

    const setFighter = (fighterId) => {
        if (fighters.length < 2) {
            setFighters([...fighters, fighterId]);
        }
    }
    
    const chooseWinner = (id1, id2) => {
        const randomNum = Math.floor(Math.random() * 2);
        const looserId = randomNum === 0 ? id2 : id1;

        setLoosers([...loosers, looserId]);
    }

    useEffect(() => {
        if (fighters.length === 2) {
            chooseWinner(fighters[0], fighters[1]);
            fighters.length = 0;
        }
    }, [fighters, setFighters, chooseWinner]);


    const getStatus = (id) => {
        // loop through squares and find the correct id and update its status
        return loosers.includes(id) ? "dead" : "live";
    }

    const isClicked = (id) => {
        return fighters.includes(id);
    }


    const drawGrid = () => {
        const rows = [];
        // we can use one dimensional array 
        for (let i = 0; i < grid; i++) {
            const curCol = [];
            for (let j = 0; j < grid; j++) {
                const id = `sq`+i+j;
                const curStatus = getStatus(id);
                curCol.push(<Square id={id} setFighter={setFighter} status={curStatus} isClicked={isClicked(id)} />);
            }
            rows.push(curCol);
        }

        return rows.map((row, rowId) => {
            return (
                <div key={rowId}>
                    {row.map((col, colId) => {
                        return (
                            <div key={colId}>{col}</div>
                        )
                    })}
                </div>
            )
        })
    }
    return (
        <StyledSquares>
            {drawGrid()}
        </StyledSquares>
    )
};
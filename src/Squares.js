import React, {useEffect, useState, useCallback} from "react";
import styled from "styled-components";

const StyledSquare = styled.div`
    width: 100px;
    height: 100px;
    border: 1px solid black;
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
    margin: 100px;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 0fr));
`;

const Column = styled.div``;

const Square = ({id, setFighter, status, isClicked}) => {
    return(
        <StyledSquare id={id} onClick={() => setFighter(id)} clicked={isClicked} status={status} >
            <h3>Square</h3>
        </StyledSquare>
    )
}

export const Squares = () => {
    const grid = 4;
    const [fighters, setFighters] = useState([]);
    const [loosers, setLoosers] = useState([]);
    const [clickCount, setClickCount] = useState(0);

    const setFighter = (fighterId) => {
        if (fighters.length < 2) {
            setFighters([...fighters, fighterId]);
        }
        setClickCount(count => count + 1);
    }
    
    const chooseWinner = useCallback((id1, id2) => {
        const randomNum = Math.round(Math.random());
        const looserId = randomNum === 0 ? id2 : id1;

        setLoosers([...loosers, looserId]);
    }, [loosers]);

    useEffect(() => {
        if (fighters.length === 2) {
            chooseWinner(fighters[0], fighters[1]);
            fighters.length = 0;
        }
    }, [fighters, setFighters, chooseWinner]);


    const getStatus = (id) => {
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
                <Row key={rowId}>
                    {row.map((col, colId) => {
                        return (
                            <Column key={colId}>{col}</Column>
                        )
                    })}
                </Row>
            )
        })
    }
    return (
        <>
            <p>Clicks count: {clickCount}</p>
            <StyledSquares>
                {drawGrid()}
            </StyledSquares>
        </>
    )
};
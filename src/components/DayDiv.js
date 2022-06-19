import Loader from './sub/Loader';
import { Link } from 'react-router-dom';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ModalContext } from './Day';
import WordsList from './WordsList'



const DayDiv = React.memo(({ isLoading, dayNum }) => {
    const setModalOpen = useContext(ModalContext);
    
    function openModal(){
        setModalOpen(true);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='DayDiv'>
            <div className='title'>
                <DayNumDiv>
                    <button onClick={openModal}>+</button>
                    <h2>DAY {dayNum}</h2>
                </DayNumDiv>
                <Link to='/add-word' state={{ day: dayNum }}><button>word추가</button></Link>
            </div>
            <WordsList />
        </div>
    )
})

export default DayDiv;

const DayNumDiv = styled.div`
    display: flex;
    align-items: center;
`
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetchGet from '../hooks/useFetchGet';
import NoDay from './sub/NoDay';
import styled from 'styled-components';
import DaysList from "./DaysList";
import Modal from 'react-modal/lib/components/Modal';
import DayDiv from './DayDiv';

export const ModalContext = React.createContext(false);
export const DataContext = React.createContext([]);

export default function Day() {
    const { dayNum } = useParams();
    const words = useFetchGet(`/words?day=${dayNum}`);
    const days = useFetchGet(`/days`);
    const targetRemD = useFetchGet(`/target-rem`);
    const [targetRem, setTargetRem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const isLoading = useMemo(()=>{
        return (!words || !days || !targetRem);
    }, [words, days, targetRem])
    
    useEffect(()=>{
        targetRemD && setTargetRem(targetRemD[0].targetRem);
    }, [targetRemD])

    if (!isLoading && days!=='none' && !(days.length>=dayNum && dayNum>0)){
        return <NoDay dayNum={dayNum}/>
    }

    return (
        <div className='Day'>
            <ModalContext.Provider value={setModalOpen}>
                <DataContext.Provider value={[words, targetRem]}>
                    <DayDiv isLoading={isLoading} dayNum={dayNum}/>
                </DataContext.Provider>
                <ModalDiv days={days} isOpen={modalOpen}/>
            </ModalContext.Provider>
        </div>
    )
}

const ModalDiv = React.memo(({ days, isOpen }) => {
    const setModalOpen = useContext(ModalContext);
    function closeModal(){
        setModalOpen(false);
    }
    return (
        <div className='ModalDiv'>
            <SModal
                isOpen={isOpen}
                onRequestClose={closeModal}
            >
                <button onClick={closeModal}>x</button>
                <DaysList days={days} />
            </SModal>
        </div>
    )
})

const SModal = styled(Modal)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 50%;
    overflow: auto;
    background-color: beige;
    border-radius: 20px;
    padding: 20px;
    button{
        background-color: transparent;
        border: none;
        font-size: 1.3rem;
    }
`
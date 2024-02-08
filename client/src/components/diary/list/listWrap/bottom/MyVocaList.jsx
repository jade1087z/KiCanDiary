import React, { useEffect, useState } from 'react'
import fetchCorrectList from '../../../../voca/fetchCorrect'

const MyVocaList = ({ uid }) => {
    const [correctList, setCorrectList] = useState([])
    console.log(uid)
    useEffect(() => {
        fetchCorrectList(correctList, setCorrectList, uid)
    }, [correctList, uid])

    return (
        <div className="voca__list">
            <h3 className="title">Voca List</h3>
            <ul>
                {correctList &&
                    correctList.map((li, key) => (
                        <li key={key}>
                            <span>{li.wrong}</span>
                            <span>{li.correct}</span>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

export default MyVocaList

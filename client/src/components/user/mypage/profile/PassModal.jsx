import React, { useState } from 'react'
import firebase from '../../../../firebase.js'
import { useNavigate } from 'react-router-dom'

const PassModal = ({ onClose, user }) => {
    const [newPassword, setNewPassword] = useState('')
    const [currentPassword, setCurrentPassword] = useState('')

    const userr = firebase.auth().currentUser
    const navigate = useNavigate()

    const updatePass = (e) => {
        e.preventDefault()

        if (newPassword && currentPassword) {
            const userData = firebase.auth.EmailAuthProvider.credential(
                user.email,
                currentPassword
            )

            userr
                .reauthenticateWithCredential(userData)
                .then(() => {
                    userr
                        .updatePassword(newPassword)
                        .then(() => {
                            alert('비밀번호 변경이 완료되었습니다.')
                            navigate('/')
                        })
                        .catch(function (error) {
                            alert('변경할 비밀번호를 확인해주세요2.')
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    alert('현재 비밀번호를 확인해주세요.')
                    console.log(error)
                })
        } else {
            alert('변경할 비밀번호를 입력해주세요 ')
        }
    }

    return (
        <div className="passmodal">
            <div className="passmodal__content">
                <div className="logo">
                    kitch <span>Candy</span>
                </div>
                <h2>Modify password</h2>
                <div className="inputWrap">
                    <input
                        type="password"
                        placeholder="현재 비밀번호"
                        onChange={(e) => setCurrentPassword(e.target.value)} // 현재 비밀번호 입력 받기
                    />
                    <input
                        type="password"
                        placeholder="변경할 비밀번호"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button onClick={(e) => updatePass(e)} className="submit">
                    Submit
                </button>
                <button onClick={onClose} className="close">
                    Close
                </button>
            </div>
        </div>
    )
}

export default PassModal

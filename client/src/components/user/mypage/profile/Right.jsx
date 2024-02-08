import React, { useState } from 'react'
import listData from '../privateUl'
import ProfileModal from './ProfileModal'
import PassModal from './PassModal'

const Right = ({ user, selectedMenu }) => {
    const logedIn = user.isLoggedIn
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
    const [isPassModalOpen, setIsPassModalOpen] = useState(false)

    const newProfileModify = () => {
        if (logedIn) {
            setIsProfileModalOpen(true)
        } else {
            alert('로그인하고 이용해주세요.')
        }
    }
    const newPassModify = () => {
        if (logedIn) {
            setIsPassModalOpen(true)
        } else {
            alert('로그인하고 이용해주세요.')
        }
    }
    const closeModal = () => {
        setIsProfileModalOpen(false)
        setIsPassModalOpen(false)
    }

    return (
        <div className="right">
            {selectedMenu === '계정' && (
                <div className="click__menu">
                    <div>프로필 </div>
                    <div>닉네임 : {user.displayName} </div>
                    <div>이메일 : {user.email} </div>
                    <div onClick={newProfileModify}>프로필 변경</div>
                    <div onClick={newPassModify}>비밀번호 변경 </div>
                    <div className="user__Delete">계정 삭제하기 </div>
                </div>
            )}
            {selectedMenu === '개인정보' && (
                <div className="click__menu">
                    <p>
                        개인정보 처리방침 안녕하세요. [kitch candy diary]를
                        이용해 주셔서 감사합니다. 본 개인정보 처리방침은
                        회원가입 및 서비스 이용 시 수집되는 개인정보에 대한
                        사항을 안내하고 있습니다. [kitch candy diary]는 이용자의
                        개인정보를 소중히 다루며, 이를 보호하기 위해 최선의
                        노력을 다하고 있습니다.
                        <ul className="menuData">
                            {listData.map((li, key) => (
                                <li key={key}>{li}</li>
                            ))}
                        </ul>
                    </p>
                </div>
            )}
            {isProfileModalOpen && (
                <ProfileModal user={user} onClose={closeModal} />
            )}
            {isPassModalOpen && <PassModal onClose={closeModal} user={user} />}
        </div>
    )
}

export default Right

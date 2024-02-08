import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
// import firebase from '../../firebase.js'
// import classNames from 'classnames';

import { registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

import userImage from '../../../assets/img/mypage__img.png'
import account from '../../../assets/img/account.png'
import protection from '../../../assets/img/protection.png'
import screen from '../../../assets/img/screen.png'
import notification from '../../../assets/img/notification.png'
import notice from '../../../assets/img/notice.png'
import contact from '../../../assets/img/contact.png'
import Right from './profile/Right'

registerPlugin(FilePondPluginFileValidateType, FilePondPluginImagePreview)

const Mypage = () => {
    const user = useSelector((state) => state.user)
    const name = user.displayName
    const email = user.email
    const [selectedMenu, setSelectedMenu] = useState('계정')

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu)
    }

    return (
        <div className="mypage__wrap">
            <div className="mypage__inner">
                <div className="left">
                    <div className="user">
                        <img src={userImage} alt="유저 이미지" />
                        <div className="user__name">
                            {user ? `${name} (${email})` : ''}
                        </div>
                    </div>

                    <div className="mypage__menu">
                        <div
                            // className={classNames('menu-item', { 'active': selectedMenu === '계정' })}
                            onClick={() => handleMenuClick('계정')}
                        >
                            <img src={account} alt="계정" />
                            계정
                        </div>
                        <div
                            // className={classNames('menu-item', { 'active': selectedMenu === '개인정보' })}
                            onClick={() => handleMenuClick('개인정보')}
                        >
                            <img src={protection} alt="개인정보 보호" />
                            개인정보 보호
                        </div>
                        <div onClick={() => handleMenuClick('화면')}>
                            <img src={screen} alt="화면" />
                            화면
                        </div>
                        <div onClick={() => handleMenuClick('알림')}>
                            <img src={notification} alt="알림" />
                            알림
                        </div>
                        <div onClick={() => handleMenuClick('공지사항')}>
                            <img src={notice} alt="공지사항" />
                            공지사항
                        </div>
                        <div onClick={() => handleMenuClick('문의하기')}>
                            <img src={contact} alt="문의하기" />
                            문의하기
                        </div>
                    </div>
                </div>

                <Right user={user} selectedMenu={selectedMenu} />
            </div>
        </div>
    )
}

export default Mypage

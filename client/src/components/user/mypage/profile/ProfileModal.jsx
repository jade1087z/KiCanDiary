import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FilePond } from 'react-filepond'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updatePhotoURL } from '../../../../reducer/userSlice'

const ProfileModal = ({ user, onClose }) => {
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const photoUrl = useSelector((state) => state.user.photoURL)
    console.log(photoUrl)
    console.log(dispatch)
    const ProfileSubmit = async () => {
        console.log(user)

        if (file) {
            try {
                const fileData = file[0]
                console.log(file)
                console.log(fileData)

                const formData = new FormData()

                formData.append('file', fileData)
                formData.append('uid', user.uid)
                // console.log(fileData)

                const response = await axios.post(
                    '/api/user/profileupload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                )
                alert('프로필이 변경되었습니다.')
                console.log(response.data.photoURL)
                dispatch(updatePhotoURL(response.data.photoURL))
            } catch (error) {
                alert('이미지 변경에 실패했습니다.')
                console.error('이미지 업로드 실패:', error)
            }
        }
    }
    useEffect(() => {
        ProfileSubmit()
    }, [dispatch])

    return (
        <div className="passmodal">
            <div className="passmodal__content">
                <div className="logo">
                    kitch <span>Candy</span>
                </div>
                <h2>Modify profile</h2>
                <div className="filePondWrap">
                    <FilePond
                        allowMultiple={false}
                        className="custom-filepond"
                        onupdatefiles={(fileItems) => {
                            setFile(fileItems.map((fileItem) => fileItem.file))
                        }}
                    />
                </div>
                <button onClick={ProfileSubmit} className="submit">
                    Submit
                </button>
                <button onClick={onClose} className="close">
                    Close
                </button>
            </div>
        </div>
    )
}

export default ProfileModal

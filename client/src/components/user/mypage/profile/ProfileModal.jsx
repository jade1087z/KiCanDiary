import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FilePond } from 'react-filepond'
import { useDispatch, useSelector } from 'react-redux'
import { updatePhotoURL } from '../../../../reducer/userSlice'
import firebase from '../../../../firebase'

const ProfileModal = ({ user, onClose }) => {
    const [file, setFile] = useState(null)
    const dispatch = useDispatch()
    const photoUrl = useSelector((state) => state.user.photoURL)

    const ProfileSubmit = async () => {

        if (file) {
            const fileData = file[0]
            const formData = new FormData()

            formData.append('file', fileData)
            formData.append('uid', user.uid)

            await axios.post('/api/user/profileupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(async(res) => {
                if (res.data.success) {
                    alert('프로필이 변경되었습니다.')
                    console.log(res.data.success)
                    console.log(res.data.photoURL)
                    dispatch(updatePhotoURL(res.data.photoURL))
                    console.log(updatePhotoURL)
                    await firebase.auth().currentUser.updateProfile({
                        photoURL: res.data.photoURL
                    })
                    onClose()
                }
            }).catch((err) => {
                alert('프로필 변경에 실패했어요.')
                console.log(err)
            })
        }
    }


    useEffect(() => {
    }, [dispatch, file, photoUrl])
    
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

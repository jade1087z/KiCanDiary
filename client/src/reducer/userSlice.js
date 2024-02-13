import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        loginUser: (state, action) => {
            state.displayName = action.payload.displayName
            state.uid = action.payload.uid
            state.accessToken = action.payload.accessToken
            state.photoURL = action.payload.photoURL || ''
            state.email = action.payload.email
            state.password = action.payload.password
            state.isLoading = true
            state.isLoggedIn = true
            sessionStorage.setItem('user', JSON.stringify(state))
            //  로컬 스토리지 사용자 정보
        },

        clearUser: (state) => {
            state.displayName = ''
            state.uid = ''
            state.accessToken = ''
            state.photoURL = ''
            state.email = ''
            state.password = ''
            state.isLoading = false
            state.isLoggedIn = false
            sessionStorage.removeItem('user')
        },

        updatePhotoURL: (state, action) => {
            state.photoURL = action.payload  // 수정된 부분

            const savedUser = JSON.parse(sessionStorage.getItem('user')) || state
            savedUser.photoURL = action.payload
            sessionStorage.setItem('user', JSON.stringify(savedUser))

            // 리덕스 스토어의 상태를 세션 스토리지의 상태로 업데이트
            state.displayName = savedUser.displayName
            state.uid = savedUser.uid
            state.accessToken = savedUser.accessToken
            state.photoURL = savedUser.photoURL
            state.isLoading = savedUser.isLoading
            state.email = savedUser.email
            state.password = savedUser.password
            state.isLoggedIn = savedUser.isLoggedIn
        },
    },

})
function getInitialState() {
    const savedUser = sessionStorage.getItem('user')
    if (savedUser) {
        return JSON.parse(savedUser)
    } else {
        return {
            displayName: '',
            uid: '',
            accessToken: '',
            photoURL: '',
            isLoading: false,
            email: '',
            password: '',
            isLoggedIn: false,
        }
    }
}
export const { loginUser, clearUser, updatePhotoURL } = userSlice.actions

export default userSlice.reducer

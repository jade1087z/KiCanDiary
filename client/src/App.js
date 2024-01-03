import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { useDispatch } from 'react-redux'
import { loginUser, clearUser } from './reducer/userSlice'
import firebase from './firebase.js'

import "./assets/scss/style.scss";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main.jsx";
import Home from "./pages/Home";
import Write from "./components/diary/Write";

import HeaderMobile from "./components/layout/Header_m";
import VocaList from "./components/voca/VocaList";
import Footer from "./components/layout/Footer";
import DiaryList from "./components/diary/DiaryList.jsx";

import Join from "./components/user/Join";
import Login from "./components/user/Login";
import Mypage from "./components/user/Mypage";

const App = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 480);
        };

        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            console.log("userInfo : " + userInfo)
            if (userInfo !== null) {
                dispatch(loginUser(userInfo.multiFactor.user));
            } else {
                dispatch(clearUser())
            }
        })
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Main>
                <Routes>
                    {/* Home 페이지 */}
                    <Route
                        path="/"
                        element={
                            <>
                                <Home />
                            </>
                        }
                    />

                    {/* Write 페이지 */}
                    <Route
                        path="/write"
                        element={

                            <>
                                {isMobile ? <HeaderMobile /> : <Header />}
                                <Write />
                            </>
                        }
                    />

                    <Route
                        path="/diarylist"
                        element={
                            <>
                                {isMobile ? <HeaderMobile /> : <Header />}
                                <DiaryList />
                            </>
                        }
                    />

                    {/* VocaList 페이지 */}
                    <Route
                        path="/voca"
                        element={
                            <>
                                {isMobile ? <HeaderMobile /> : <Header />}
                                <VocaList />
                            </>
                        }
                    />
                    <Route path="/join" element={
                        <>
                            {isMobile ? <HeaderMobile /> : <Header />}
                            <Join />
                        </>
                    } />
                    <Route path="/login" element={
                        <>
                            {isMobile ? <HeaderMobile /> : <Header />}
                            <Login />
                        </>
                    } />
                    <Route path="/mypage" element={
                        <>
                            {isMobile ? <HeaderMobile /> : <Header />}
                            <Mypage />
                        </>
                    } />

                    {/* 다른 페이지에는 Header가 나오도록 설정 */}
                    <Route path="/*" element={isMobile ? <HeaderMobile /> : <Header />} />
                </Routes>
            </Main>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
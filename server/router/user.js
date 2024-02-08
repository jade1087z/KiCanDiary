const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

// 스키마
const { User } = require('../model/User.js')
const { Counter } = require('../model/Counter.js')

router.post('/join', (req, res) => {
    let temp = req.body
    console.log(temp, 'join user Data')
    Counter.findOne({ name: 'counter' })
        .then((result) => {
            temp.userNum = result.userNum

            const userData = new User(temp)
            userData
                .save()
                .then(() => {
                    Counter.updateOne(
                        { name: 'counter' },
                        { $inc: { userNum: 1 } }
                    )
                        .then(() => {
                            res.status(200).json({ success: true })
                        })
                        .catch((err) => {
                            console.log(err)
                            res.status(400).json({ success: false })
                        })
                })
                .catch((err) => {
                    console.log(err, 'userDatafalse')
                    res.status(400).json({ success: false })
                })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

router.post('/emailcheck', (req, res) => {
    User.findOne({ email: req.body.Email })
        .exec()
        .then((result) => {
            let check = true
            if (result) {
                check = false
            }
            res.status(200).json({ success: true, check })
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json({ success: false })
        })
})

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${path.extname(file.originalname)}`)
    },
})
const upload = multer({ storage: storage })

router.post('/profileupload', upload.single('file'), (req, res) => {
    const uid = req.body.uid
    const file = req.file
    const photoURL = file.path
    console.log(photoURL)
    User.updateOne({ uid: uid }, { $set: { photoURL: photoURL } })
        .exec()
        .then((result) => {
            if (result.nModified == 0) {
                res.json({
                    success: false,
                    message: '사진 업데이트에 실패하였습니다.',
                })
            } else {
                res.json({
                    success: true,
                    photoURL: photoURL,
                    message: '사진 업데이트에 성공하였습니다.',
                })
            }
        })
        .catch((err) => {
            console.error(err)
            res.json({
                success: false,
                message: '서버 오류로 사진 업데이트에 실패하였습니다.',
            })
        })
})
module.exports = router

import express from 'express'
const userRouter = express.Router()
import { protect } from '../middleware/authMiddleware.js';
import { multerUploadUserProfile } from '../config/multerConfig.js';
import {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile
} from '../controllers/userController.js';

userRouter.post('/',registerUser)
userRouter.post('/auth',authUser)
userRouter.post('/logout',logoutUser)
userRouter.route('/profile').get(protect,getUserProfile).put(multerUploadUserProfile.single('profileImageName'),protect,updateUserProfile)


export default userRouter

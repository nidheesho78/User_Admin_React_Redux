import express from 'express'
const adminRouter = express.Router();
import { protect } from '../middleware/adminAuthMiddleware.js';


import {
    authAdmin,
    logoutAdmin,
    getAllUser,
    updateUserData,
    deleteUser,
    addNewUser
}from '../controllers/adminController.js'


adminRouter.post('/auth',authAdmin)
adminRouter.post('/logout',logoutAdmin)
adminRouter.post('/get-user',protect,getAllUser)
adminRouter.put('/update-user',updateUserData)
adminRouter.delete('/delete-user',deleteUser) 
adminRouter.post('/add-user',addNewUser)





 export default adminRouter
import express from 'express'
import { signUp, logout, login } from '../controllers/userControllers'
import { middleware } from '../middleware'

export const userRouter=express.Router()

userRouter.post('/signUp', signUp)
userRouter.post('/login',login)
userRouter.post('/logout', middleware,logout)
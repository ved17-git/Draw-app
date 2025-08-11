import express from 'express'

export const roomRouter=express.Router()
import { createRoom } from '../controllers/roomControllers'
import { middleware } from '../middleware'

roomRouter.post('/createRoom',middleware, createRoom)
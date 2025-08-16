import express from 'express'

export const roomRouter=express.Router()
import { createRoom } from '../controllers/roomControllers'
import { getChats } from '../controllers/roomControllers'
import { joinRoom } from '../controllers/roomControllers'
import { middleware } from '../middleware'

roomRouter.post('/createRoom',middleware, createRoom)
roomRouter.get('/chats/:roomId',middleware, getChats)
roomRouter.post('/joinRoom',middleware, joinRoom)
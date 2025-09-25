import express from 'express'

export const roomRouter=express.Router()
import { createRoom } from '../controllers/roomControllers'
import { getChats } from '../controllers/roomControllers'
import { joinRoom } from '../controllers/roomControllers'
import { getRooms } from '../controllers/roomControllers'
import { middleware } from '../middleware'

roomRouter.post('/createRoom',middleware, createRoom)
roomRouter.get('/getRooms', middleware, getRooms)

roomRouter.get('/chats/:roomId', getChats)
roomRouter.get('/joinRoom/:room', joinRoom)
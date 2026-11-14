import express from 'express'
import { createConversation, getMessages, getConversations, saveMessage, updateConversation, deleteConversation } from '../controllers/chat.controller.js'

const router = express.Router()

router.post('/create-conversation',createConversation)
router.get('/get-conversations',getConversations)
router.post('/update-conversation',updateConversation)
router.post('/save-message',saveMessage)
router.get('/get-messages/:conversationId',getMessages)
router.delete("/delete-conversation/:id", deleteConversation);

export default router
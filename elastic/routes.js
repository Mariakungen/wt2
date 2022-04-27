import express from 'express'
import { query } from './elastic.js'

export const router = express.Router()

router.use('/', query)
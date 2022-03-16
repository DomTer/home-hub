import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/giro', async (req, res) => {
  const transactions = await prisma.transactions_giro.findMany();
  res.json(transactions)
})

app.get('/creditcard', async (req, res) => {
  let transactions = await prisma.transactions_creditcard.findMany();
  res.json(transactions)
})

export default {
  path: '/api',
  handler: app
}

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

app.get('/getPaymentsByCategory/:name', async (req, res) => {
  let payments = await prisma.Payment.findMany({
      where: {
        categories: {
          some: {
              name: req.params.name,
          },
        },
      },
    });
  return res.json(JSON.stringify(payments))
})

app.get('/invoices', async (req, res) => {
  let invoices = await prisma.Invoice.findMany();
  res.json(invoices)
})

app.get('/recurring-invoices', async (req, res) => {
  let RecurringInvoices = await prisma.RecurringInvoice.findMany();
  res.json(RecurringInvoices)
})

app.get('/payments', async (req, res) => {
  let payments = await prisma.Payment.findMany(
    {
      include: {
        categories: true
      }
    }
  );
  res.json(payments)
})

app.get('/payment-cats', async (req, res) => {
  let paymentCats = await prisma.PaymentCategory.findMany();
  res.json(paymentCats)
})

export default {
  path: '/api',
  handler: app
}

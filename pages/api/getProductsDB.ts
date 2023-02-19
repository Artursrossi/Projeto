import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((res) => res.json())
    .then((data) => {
      return response.status(201).json(data)
    })
    .catch((err) => {
      return response.status(400).json(err)
    })
}

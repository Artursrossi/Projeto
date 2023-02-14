import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { link } = request.body;
  
  await prisma.links.findUnique({
    where: {
        link: link,
    },
    select: {
        productsIDs: true
    },
})
.then(data => {
    return response.status(201).json(data)
})
.catch(err => {return response.status(400).json(err)}) 
}
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
    await prisma.produtos.findMany()
    .then(data => {
        return response.status(200).json(data);
    })
    .catch(err => {return response.status(400).json(err)}) 
}
import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { ArrProducts } = request.body;
  const DataProducts: any = [];
  
  for(var id of ArrProducts){
    await prisma.produtos.findUnique({
        where: {
        id: id,
        },
        select: {
        name: true,
        icon: true
        },
    })
    .then(data => {
        DataProducts.push(data);
    })
    .catch(err => {return response.status(400).json(err)}) 
  }
  return response.status(201).json(DataProducts)
}
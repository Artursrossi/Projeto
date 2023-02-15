import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { link, ProductsArray } = request.body;
    const productsArrayInString: string = ProductsArray.toString();

    await prisma.links.update({
        where: {
          link: link,
        },
        data: {
          productsIDs: productsArrayInString,
        },
    })
    .then(() => {return response.status(201).json('OK')})
    .catch(err => {return response.status(400).json(err)}) 
}
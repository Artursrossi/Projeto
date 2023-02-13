import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { token, link,  ProductsArray } = request.body;

    console.log(token)
    console.log(link)

   const productsArrayInString = ProductsArray.toString();

   
    await prisma.user.findUnique({
        where: {
            token: token,
        },
        select: {
            email: true
        },
    })
    .then((res) => {
        if(res){
            CreateLink(res.email)
        }
        else{
            return response.status(200).json('InvalidToken');
        }
    })
    .catch(err => {return response.status(400).json(err)})

    async function CreateLink(email: string){
        await prisma.links.create({
            data: {
                userEmail: email,
                link: link,
                productsIDs: productsArrayInString
            },
        })
        .then(() => {return response.status(201).json('OK')})
        .catch(err => {return response.status(400).json(err)})
    }
}
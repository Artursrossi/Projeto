import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { token } = request.body;
  
    //find email with token
    await prisma.user.findUnique({
        where: {
            token: token,
        },
        select: {
            email: true
        },
    })
    .then((data: any) => {
        checkEmailLink(data.email)
    })
    .catch(err => {return response.status(400).json(err)}) 

    //find if email has link
    async function checkEmailLink(email: string){
        let hasLink = await prisma.links.findUnique({
            where: {
                userEmail: email,
            },
            select: {
                link: true
            }
        })
        if(hasLink){
            return response.status(200).json(hasLink.link)
        }
        else{
            return response.status(201).json('OK')
        }
    }
}
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { email, pass } = request.body;

    if(verifyData()){
        await prisma.user.findUnique({
            where: {
                email: email,
            },
              select: {
                pass: true
            },
        })
        .then((hash) => {
            if(hash){
                LogIn(hash);
            }
            else{
                return response.status(200).json('InvalidEmail');
            }
        })
        .catch(err => {return response.status(400).json(err)})
    }
    else{
        return response.status(200).json('VerifyDataError');
    }

    async function LogIn(hash: any){
        const validPassword = await bcrypt.compareSync(pass, hash.pass);
        if(validPassword){
            await prisma.user.findUnique({
                where: {
                    email: email,
                },
                  select: {
                    token: true
                },
            })
            .then((token: any) => {
                return response.status(201).json(token)
            })
            .catch(err => {return response.status(400).json(err)})
        }
        else{
            return response.status(200).json('InvalidPass');
        }
    }

    function verifyData(){
        if(email && pass){
            var regex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
            if(regex.test(email) == true){
                return true;
            }
        }
    }
}
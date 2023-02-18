import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const { token, link,  ProductsArray } = request.body;

   const productsArrayInString: string = ProductsArray.toString();
   
    if(VerifyData()){
        //verify if link already exists
        await prisma.links.findUnique({
            where: {
              link: link,
            },
        })
        .then(checkLink => {
            if(!checkLink){
                CheckEmail();
            }
            else{
                return response.status(200).json('LinkAlreadyExists');
            }})
        .catch(err => {return response.status(400).json(err)})
    }
    else{
        return response.status(200).json('VerifyDataError');
    }

    async function CheckEmail(){
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
                CreateList(res.email)
            }
            else{
                return response.status(200).json('InvalidToken');
            }
        })
        .catch(err => {return response.status(400).json(err)})
    }

    async function CreateList(email: string){
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

    function VerifyData(){
        // token, link, ProductsArray, link == onlyLetters, 3>=link>=20
        let ReGexLink = /^[A-Za-z]{3,20}$/;
        if(token && link && ProductsArray && ReGexLink.test(link) == true && link.length >= 3 && link.length <= 20){
            return true;
        }
        else{
            return false;
        }
    }
}
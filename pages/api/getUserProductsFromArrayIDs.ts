import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { ArrProducts } = request.body;
  const DataProducts: Array<{id:number; title:string; url: string;} | null> = [];
  
  function filterSelectedProducts(AllProducts: any){
    for(var id of ArrProducts){
      let ArrayUnFiltered = AllProducts.filter((item: any) => item.id == id);
      ArrayUnFiltered.forEach((jsonData:any) => {
        DataProducts.push(jsonData);
      })
    }
    return response.status(201).json(DataProducts)
  }

  if(VerifyData()){
    fetch('https://jsonplaceholder.typicode.com/photos')
    .then(res => res.json())
    .then(resJSON => {filterSelectedProducts(resJSON)})
    .catch(err => {return response.status(400).json(err)})
  }
  else{
    return response.status(200).json('VerifyDataError');
  }

  function VerifyData(){
    if(ArrProducts){
      return true;
    }
    else{
      return false;
    }
  }
}
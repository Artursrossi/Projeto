import { PrismaClient } from '@prisma/client'
import { type NextApiRequest, type NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { link, ProductsArray } = request.body

  if (VerifyData()) {
    const productsArrayInString: string = ProductsArray.toString()

    await prisma.links
      .update({
        where: {
          link,
        },
        data: {
          productsIDs: productsArrayInString,
        },
      })
      .then(() => {
        return response.status(201).json('OK')
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  function VerifyData(): boolean {
    if (link !== undefined && ProductsArray !== undefined) {
      return true
    } else {
      return false
    }
  }
}

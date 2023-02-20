import { PrismaClient } from '@prisma/client'
import { type NextApiRequest, type NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { token, link, ProductsArray } = request.body

  const productsArrayInString: string = ProductsArray.toString()

  if (VerifyData()) {
    // verify if link already exists
    await prisma.links
      .findUnique({
        where: {
          link,
        },
      })
      .then((checkLink) => {
        if (checkLink == null) {
          CheckEmail()
        } else {
          return response.status(200).json('LinkAlreadyExists')
        }
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  async function CheckEmail(): Promise<void> {
    await prisma.user
      .findUnique({
        where: {
          token,
        },
        select: {
          email: true,
        },
      })
      .then((res) => {
        if (res != null) {
          CreateList(res.email)
        } else {
          return response.status(200).json('InvalidToken')
        }
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  async function CreateList(email: string): Promise<void> {
    await prisma.links
      .create({
        data: {
          userEmail: email,
          link,
          productsIDs: productsArrayInString,
        },
      })
      .then(() => {
        return response.status(201).json('OK')
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  function VerifyData(): boolean {
    // token, link, ProductsArray, link == onlyLetters, 3>=link>=20
    const ReGexLink = /^[A-Za-z]{3,20}$/
    if (
      token !== undefined &&
      link !== undefined &&
      ProductsArray !== undefined &&
      ReGexLink.test(link) &&
      link.length >= 3 &&
      link.length <= 20
    ) {
      return true
    } else {
      return false
    }
  }
}

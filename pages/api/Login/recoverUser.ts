import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { token } = request.body

  if (verifyData()) {
    await prisma.user
      .findUnique({
        where: {
          token: token,
        },
        select: {
          name: true,
          email: true,
        },
      })
      .then((data) => {
        return response.status(200).json(data)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  function verifyData() {
    if (token) {
      return true
    } else {
      return false
    }
  }
}

import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { token } = request.body

  if (VerifyData()) {
    //find email with token
    await prisma.user
      .findUnique({
        where: {
          token: token,
        },
        select: {
          email: true,
        },
      })
      .then((data) => {
        if (data) {
          checkEmailLink(data.email)
        } else {
          return response.status(200).json('InvalidToken')
        }
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  //check if email has a link
  async function checkEmailLink(email: string) {
    let hasLink = await prisma.links.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        link: true,
      },
    })
    if (hasLink) {
      return response.status(201).json(hasLink.link)
    } else {
      return response.status(200).json('OK')
    }
  }

  function VerifyData() {
    if (token) {
      return true
    } else {
      return false
    }
  }
}

import { PrismaClient } from '@prisma/client'
import { type NextApiRequest, type NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { token } = request.body

  if (VerifyData()) {
    // find email with token
    await prisma.user
      .findUnique({
        where: {
          token,
        },
        select: {
          email: true,
        },
      })
      .then((data) => {
        if (data != null) {
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

  // check if email has a link
  async function checkEmailLink(email: string): Promise<void> {
    const hasLink = await prisma.links.findUnique({
      where: {
        userEmail: email,
      },
      select: {
        link: true,
      },
    })
    if (hasLink != null) {
      return response.status(201).json(hasLink.link)
    } else {
      return response.status(200).json('OK')
    }
  }

  function VerifyData(): boolean {
    if (token !== undefined) {
      return true
    } else {
      return false
    }
  }
}

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async (request: NextApiRequest, response: NextApiResponse) => {
  const { name, email, pass, samepass } = request.body

  if (VerifyData()) {
    await prisma.user
      .findUnique({
        where: {
          email: email,
        },
      })
      .then((checkEmailOnDB) => {
        if (!checkEmailOnDB) {
          CreateAccount()
        } else {
          return response.status(200).json('EmailAlreadyExist')
        }
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  async function CreateAccount() {
    const hash = await bcrypt.hashSync(pass, 10)
    await prisma.user
      .create({
        data: {
          name: name,
          email: email,
          pass: hash,
          token: uuid(),
        },
      })
      .then(() => {
        return response.status(201).json('OK')
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  }

  function VerifyData() {
    // name, email, pass, samepass, email == ReGex, name == onlyLetters, pass == samepass
    let ReGexEmail =
      /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/
    let ReGexName = /^[a-zA-ZzáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]{3,30}$/
    if (
      name &&
      email &&
      pass &&
      samepass &&
      ReGexEmail.test(email) == true &&
      ReGexName.test(name) == true &&
      pass == samepass
    ) {
      return true
    } else {
      return false
    }
  }
}

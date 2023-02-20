import { type NextApiRequest, type NextApiResponse } from 'next'

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  fetch('https://jsonplaceholder.typicode.com/photos')
    .then(async (res) => await res.json())
    .then((data) => {
      return response.status(201).json(data)
    })
    .catch((err) => {
      return response.status(400).json(err)
    })
}

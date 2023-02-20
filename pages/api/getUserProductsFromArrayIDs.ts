import { type NextApiRequest, type NextApiResponse } from 'next'

export default async (
  request: NextApiRequest,
  response: NextApiResponse
): Promise<void> => {
  const { ArrProducts } = request.body
  const DataProducts: Array<{ id: number; title: string; url: string } | null> =
    []

  function filterSelectedProducts(AllProducts: any): void {
    for (const id of ArrProducts) {
      const ArrayUnFiltered = AllProducts.filter((item: any) => item.id === id)
      ArrayUnFiltered.forEach((jsonData: any) => {
        DataProducts.push(jsonData)
      })
    }
    return response.status(201).json(DataProducts)
  }

  if (VerifyData()) {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then(async (res) => await res.json())
      .then((resJSON) => {
        filterSelectedProducts(resJSON)
      })
      .catch((err) => {
        return response.status(400).json(err)
      })
  } else {
    return response.status(200).json('VerifyDataError')
  }

  function VerifyData(): boolean {
    if (ArrProducts !== undefined) {
      return true
    } else {
      return false
    }
  }
}

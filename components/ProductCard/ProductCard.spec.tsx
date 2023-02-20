import { render } from '@testing-library/react'
import { ProductCard } from '.'

describe('<ProductCard />', () => {
  it('shoud be render', () => {
    render(
      <ProductCard
        product={{ id: 1, title: 'title 1', url: '/img/test.png' }}
        addProduct={() => {}}
        removeProduct={() => {}}
        withButton={false}
      />
    )
  })
})

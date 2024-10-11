import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

export type Product = {
  id: string
  name: string
  description: string
  image: string
  price: number
}

type PropTypes = { product: Product }

const ProductCard = ({ product }: PropTypes) => {
  return (
    <Card className='border-none rounded-2xl'>
      <CardHeader className='flex items-center justify-center'>
        <Image alt='pizza-image' width={150} height={150} src={product.image} />
      </CardHeader>
      <CardContent>
        <h2 className='text-xl font-bold'>{product.name}</h2>
        <p className='mt-2'>{product.description}</p>
      </CardContent>
      <CardFooter className='flex justify-between mt-2'>
        <p>
          <span>From </span>
          <span className='font-bold'>${product.price}</span>
        </p>
        <Button
          size='sm'
          className='rounded-full px-5 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150'
        >
          Choose
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductCard

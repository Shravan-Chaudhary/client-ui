import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import Image from 'next/image'
import React from 'react'
import pizzaImage from '@/images/pizza.png'
import { Product } from '../types'

type PropTypes = { product: Product }

const ProductModal = ({ product }: PropTypes) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          size: 'sm',
          className:
            'px-5 hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150',
        })}
      >
        Choose
      </DialogTrigger>
      <DialogContent className='max-w-3xl p-0 '>
        <div className='flex'>
          {/* left */}
          <div className='w-1/3 bg-white rounded-l-3xl p-2 flex items-center justify-center'>
            <Image alt='image' src={pizzaImage} height={250} width={250} />
          </div>
          {/* right */}
          <div className='w-2/3 py-4 px-6'>
            <h3 className='text-xl font-bold'>{product.name}</h3>
            <p className='mt-1'>{product.description}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductModal

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import menu from '@/images/menu.png'
import ProductCard, { Product } from './productCard'

const pizzas: Product[] = [
  {
    id: '1',
    name: 'Margherita',
    description: 'Classic pizza with tomato sauce, mozzarella, and basil',
    image: '/pizza.png',
    price: 8.99,
  },
  {
    id: '2',
    name: 'Pepperoni',
    description: 'Pepperoni pizza with tomato sauce and mozzarella',
    image: '/pizza.png',
    price: 9.99,
  },
  {
    id: '3',
    name: 'BBQ Chicken',
    description: 'BBQ sauce, chicken, red onions, and cilantro',
    image: '/pizza.png',
    price: 10.99,
  },
  {
    id: '4',
    name: 'Veggie',
    description: 'Tomato sauce, mozzarella, bell peppers, olives, and onions',
    image: '/pizza.png',
    price: 9.49,
  },
]

const CatalogSection = () => {
  return (
    <section className='mt-[195px]'>
      <div>
        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold mb-14'>
          <span>Choose from Epic Catalogue</span>{' '}
          <Image
            src={menu}
            alt='flame'
            className='h-8 w-8 sm:h-12 sm:w-12 inline-block'
          />
        </h1>
      </div>

      <div className='flex items-center justify-center'>
        <Tabs defaultValue='pizza' className=''>
          <TabsList>
            <TabsTrigger value='pizza'>Pizza</TabsTrigger>
            <TabsTrigger value='drinks'>Drinks</TabsTrigger>
            <TabsTrigger value='snacks'>Snacks</TabsTrigger>
          </TabsList>
          <TabsContent value='pizza'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
              {pizzas.map((pizza) => {
                return <ProductCard key={pizza.id} product={pizza} />
              })}
            </div>
          </TabsContent>
          <TabsContent value='drinks'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
              {pizzas.map((pizza) => {
                return <ProductCard key={pizza.id} product={pizza} />
              })}
            </div>
          </TabsContent>
          <TabsContent value='snacks'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8'>
              {pizzas.map((pizza) => {
                return <ProductCard key={pizza.id} product={pizza} />
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default CatalogSection

import Hero from '@/components/hero'
import MaxWidthWrapper from '@/components/maxWidthWrapper'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'
import menu from '@/images/menu.png'

export default function Home() {
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
      <Hero />
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

        <div>
          <Tabs defaultValue='pizza' className='w-[1000px] h-[1000px]'>
            <TabsList>
              <TabsTrigger value='pizza'>Pizza</TabsTrigger>
              <TabsTrigger value='drinks'>Drinks</TabsTrigger>
              <TabsTrigger value='snacks'>Snacks</TabsTrigger>
            </TabsList>
            <TabsContent value='pizza'>Pizza content</TabsContent>
            <TabsContent value='drinks'>Drinks content</TabsContent>
            <TabsContent value='snacks'>Snacks content</TabsContent>
          </Tabs>
        </div>
      </section>
    </MaxWidthWrapper>
  )
}

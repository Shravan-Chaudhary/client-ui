import React from 'react'
import Pill from '@/components/pill'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pizza } from 'lucide-react'
import Image from 'next/image'
import pizza from '@/images/pizza.png'

const Hero = () => {
  return (
    <>
      {/* Hero Container */}
      <div className='w-full flex justify-between h-[100%]'>
        {/* Branding */}
        <div className='mt-1p0'>
          <Pill>Ranked #1 in India</Pill>
          <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
            Fuel your <span className='text-primary'>Gaming </span> with Epic
            Fuel.
          </h1>
          <p className='mt-7 max-w-prose text-zinc-700 sm:text-lg'>
            We fuel your epic quests without interrupting gameplay. Recharge
            your energy with just a click and keep the snacks coming for those
            late-night sessions!
          </p>
          <Link href={'/'}>
            <Button size={'lg'} className='rounded-full mt-5'>
              Order Now <Pizza className='ml-2 h-5 w-5' />
            </Button>
          </Link>
          <div></div>
        </div>

        {/* Pizza */}
        <Image
          src={pizza}
          alt='pizza'
          height={500}
          width={500}
          className='-z-0 hidden lg:inline-flex max-h-[500px] max-w-[500px]'
        />
      </div>
    </>
  )
}

export default Hero

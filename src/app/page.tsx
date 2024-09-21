import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import Pill from '@/components/Pill'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pizza } from 'lucide-react'
export default function Home() {
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
      <Pill>Order Now!</Pill>
      <h1 className='max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl'>
        Fuel your <span className='text-primary'>Gaming </span> with Epic Fuel.
      </h1>
      <p className='mt-7 max-w-prose text-zinc-700 sm:text-lg'>
        We fuel your epic quests without interrupting gameplay. Recharge your
        energy with just a click and keep the snacks coming for those late-night
        sessions!
      </p>
      <Link href={'/'}>
        <Button size={'lg'} className='rounded-full mt-5'>
          {' '}
          Order Now <Pizza className='ml-2 h-5 w-5' />
        </Button>
      </Link>
    </MaxWidthWrapper>
  )
}

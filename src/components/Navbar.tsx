import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import CustomSelect from './Select'
import basket from '@/images/basket.png'
import Image from 'next/image'
import Dot from './Dot'
import { cn } from '@/lib/utils'

const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          {/* Logo */}
          <Link href={'/'} className='flex z-40 font-semibold space-x-5'>
            <span>fuel.</span>
          </Link>

          {/* Menu Items */}
          <div className=' items-center gap-4 flex'>
            <div className='font-medium text-gray-800 inline-flex'>
              <CustomSelect />
            </div>

            <div className='hidden sm:flex'>
              <Link
                href={'/menu'}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                Menu
              </Link>
              <Link
                href={'/orders'}
                className={buttonVariants({ variant: 'ghost', size: 'sm' })}
              >
                Orders
              </Link>

              {/* Cart Icon */}
              <Link
                href={'/cart'}
                className={cn(
                  buttonVariants({ variant: 'ghost', size: 'sm' }),
                  'relative mr-5',
                )}
              >
                <Image src={basket} alt='basket' width={23} height={23} />
                <Dot />
              </Link>

              <Link href={'/logout'} className=''>
                <Button size='sm' className='rounded-full px-5'>
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar

import React from 'react'
import MaxWidthWrapper from './MaxWidthWrapper'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import CustomSelect from './Select'

const Navbar = () => {
  return (
    <nav className='sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        {/* Logo */}
        <div className='flex h-14 items-center justify-between border-b border-zinc-200'>
          <Link href={'/'} className='flex z-40 font-semibold space-x-5'>
            <span>fuel.</span>
          </Link>

          {/* Menu Items */}
          <div className='hidden items-center space-x-4 sm:flex'>
            <div className='font-medium text-gray-800'>
              <CustomSelect />
            </div>

            <Link
              href={'/pricing'}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            >
              Menu
            </Link>
            <Link
              href={'/pricing'}
              className={buttonVariants({ variant: 'ghost', size: 'sm' })}
            >
              Orders
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar

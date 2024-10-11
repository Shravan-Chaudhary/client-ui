import Hero from '@/app/(home)/_components/hero'
import MaxWidthWrapper from '@/components/maxWidthWrapper'
import CatalogSection from './_components/catalogSection'
export default function Home() {
  return (
    <MaxWidthWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center'>
      <Hero />
      {/* Tabs */}
      <CatalogSection />
    </MaxWidthWrapper>
  )
}

import * as React from 'react'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const CustomSelect = () => {
  return (
    <Select>
      <SelectTrigger className='w-[140px] h-[30px]'>
        <SelectValue placeholder='Select Outlet' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Locations</SelectLabel>
          <SelectItem value='apple'>Agra</SelectItem>
          <SelectItem value='banana'> Delhi</SelectItem>
          <SelectItem value='blueberry'>Noida</SelectItem>
          <SelectItem value='grapes'>Mohali</SelectItem>
          <SelectItem value='pineapple'>Chandigarh</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default CustomSelect

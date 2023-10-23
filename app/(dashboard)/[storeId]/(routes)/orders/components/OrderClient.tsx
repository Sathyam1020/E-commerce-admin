'use client'

import Heading from '@/components/ui/Heading';
import { Separator } from '@/components/ui/separator';
import React from 'react'
import { Columns, OrderColumn } from './Columns';
import { DataTable } from '@/components/ui/DataTable';

interface OrderClientProps {
  data: OrderColumn[];  
}

const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title={`Orders (${data?.length})`}
          description='Manage orders for your store'
        />
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="products"/>
    </>
  )
}

export default OrderClient; 
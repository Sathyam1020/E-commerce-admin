'use client'

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { BillboardColumn, Columns } from './Columns';
import { DataTable } from '@/components/ui/DataTable';
import ApiList from '@/components/ui/ApiList';

interface BillboardClientProps {
  data: BillboardColumn[];  
}

const BillboardsClient: React.FC<BillboardClientProps> = ({
  data
}) => {

  const router = useRouter(); 
  const params = useParams(); 

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title={`Billboards (${data?.length})`}
          description='Manage billboards for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className='mr-2 h-4 w-4'/>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="label"/>
      <Heading title='API' description='API calls for Billboards'/>
      <Separator />
      <ApiList entityName='billboards' entityIdName='billboardId'/>
    </>
  )
}

export default BillboardsClient; 
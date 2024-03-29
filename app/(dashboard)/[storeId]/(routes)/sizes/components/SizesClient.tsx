'use client'

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import {  Columns, SizeColumn } from './Columns';
import { DataTable } from '@/components/ui/DataTable';
import ApiList from '@/components/ui/ApiList';

interface SizeClientProps {
  data: SizeColumn[];  
}

const SizesClient: React.FC<SizeClientProps> = ({
  data
}) => {

  const router = useRouter(); 
  const params = useParams(); 

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title={`Sizes (${data?.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4'/>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name"/>
      <Heading title='API' description='API calls for Sizes'/>
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId'/>
    </>
  )
}

export default SizesClient; 
'use client'

import Heading from '@/components/ui/Heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react'
import { CategoryColumn, Columns } from './Columns';
import { DataTable } from '@/components/ui/DataTable';
import ApiList from '@/components/ui/ApiList';

interface CategoryClientProps {
  data: CategoryColumn[];  
}

const CategoryClient: React.FC<CategoryClientProps> = ({
  data
}) => {

  const router = useRouter(); 
  const params = useParams(); 

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading 
          title={`Categories (${data?.length})`}
          description='Manage catogories for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <Plus className='mr-2 h-4 w-4'/>
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={Columns} data={data} searchKey="name"/>
      <Heading title='API' description='API calls for Categories'/>
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId'/>
    </>
  )
}

export default CategoryClient; 
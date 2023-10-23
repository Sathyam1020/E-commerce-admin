"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "./CellAction";

export type SizeColumn = {
  id: string; 
  name: string; 
  value: string; 
  createdAt: string; 
}
 
export const Columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
  },
  {
    accessorKey: "createdAt",
    header: "CreatedAt",
  },
  {
    id: "actions", 
    cell: ({ row }) => <CellAction data={row.original}/>,
    header: "Actions"
  }
]
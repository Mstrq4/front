"use client"

import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InvoiceItem } from "@/types"
import { Edit, Plus, Trash } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

interface InvoiceItemsTableProps {
  items: InvoiceItem[]
  onAdd: () => void
  onEdit: (item: InvoiceItem) => void
  onDelete: (id: string) => void
}

export function InvoiceItemsTable({
  items,
  onAdd,
  onEdit,
  onDelete,
}: InvoiceItemsTableProps) {
  const calculateTotal = (items: InvoiceItem[]) => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Items</h3>
        <Button onClick={onAdd} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.description}</TableCell>
              <TableCell className="text-right">{item.quantity}</TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.price)}
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.total)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(item)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {items.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No items added yet.
              </TableCell>
            </TableRow>
          )}
          {items.length > 0 && (
            <TableRow>
              <TableCell colSpan={3} className="text-right font-medium">
                Total:
              </TableCell>
              <TableCell className="text-right font-bold">
                {formatCurrency(calculateTotal(items))}
              </TableCell>
              <TableCell />
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

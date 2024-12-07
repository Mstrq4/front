"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InvoiceItem } from "@/types"
import { formatCurrency } from "@/lib/utils"


interface InvoiceItemDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: InvoiceItem
  onSubmit: (item: InvoiceItem) => void
}

export function InvoiceItemDialog({
  open,
  onOpenChange,
  item,
  onSubmit,
}: InvoiceItemDialogProps) {
  const [formData, setFormData] = useState<Omit<InvoiceItem, "id">>({
    description: "",
    quantity: 1,
    price: 0,
    total: 0,
  })

  useEffect(() => {
    if (item) {
      setFormData({
        description: item.description,
        quantity: item.quantity,
        price: item.price,
        total: item.total,
      })
    } else {
      setFormData({
        description: "",
        quantity: 1,
        price: 0,
        total: 0,
      })
    }
  }, [item])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = formData.quantity * formData.price
    onSubmit({
      id: item?.id || Date.now().toString(),
      ...formData,
      total,
    })
    onOpenChange(false)
  }

  const updateTotal = (quantity: number, price: number) => {
    setFormData((prev) => ({
      ...prev,
      quantity,
      price,
      total: quantity * price,
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) =>
                  updateTotal(Number(e.target.value), formData.price)
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  updateTotal(formData.quantity, Number(e.target.value))
                }
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Total</Label>
            <div className="text-2xl font-bold">
              {formatCurrency(formData.total)}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{item ? "Update" : "Add"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

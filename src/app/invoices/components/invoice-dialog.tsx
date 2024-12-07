"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Invoice, InvoiceFormData, InvoiceItem, Customer, Address } from "@/types"
import { InvoiceForm } from "./invoice-form"
import { InvoiceItemsTable } from "./invoice-items-table"
import { InvoiceItemDialog } from "./invoice-item-dialog"
import { formatCurrency } from "@/lib/utils"

// Mock data
const MOCK_CUSTOMERS: Customer[] = [
    { 
      id: "1", 
      name: "John Doe", 
      email: "john@example.com", 
      phone: "1234567890", 
      createdAt: new Date().toISOString(), 
      updatedAt: new Date().toISOString() 
    },
  ]
  
  const MOCK_ADDRESSES: Address[] = [
    { 
      id: "1", 
      userId: "1", 
      address: "123 Main St", 
      cityId: "1", 
      postalCode: "12345", 
      createdAt: new Date().toISOString() 
    },
  ]
  
  interface InvoiceDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    invoice?: Invoice
  }
  
  export function InvoiceDialog({ open, onOpenChange, invoice }: InvoiceDialogProps) {
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNo: "",
    date: new Date().toISOString().split('T')[0],
    dueDate: "",
    status: "draft",
    subTotal: 0,
    totalAmount: 0,
    customerId: "",
    addressId: "",
  })
  const [items, setItems] = useState<InvoiceItem[]>([])
  const [openItemDialog, setOpenItemDialog] = useState(false)
  const [editingItem, setEditingItem] = useState<InvoiceItem>()

  useEffect(() => {
    if (invoice) {
      setFormData({
        invoiceNo: invoice.invoiceNo,
        date: invoice.date,
        dueDate: invoice.dueDate,
        status: invoice.status,
        subTotal: invoice.subTotal,
        totalAmount: invoice.totalAmount,
        customerId: invoice.customerId,
        addressId: invoice.addressId,
      })
      setItems(invoice.items || [])
    }
  }, [invoice])

  const handleSubmit = async (data: InvoiceFormData) => {
    try {
      const now = new Date().toISOString()
      const newInvoice: Invoice = {
        id: invoice?.id || Date.now().toString(),
        ...data,
        items,
        createdAt: invoice?.createdAt || now,
        updatedAt: now,
      }

      // Here you would typically save to your backend
      console.log('Saving invoice:', newInvoice)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving invoice:', error)
    }
  }

  const handleAddItem = (item: InvoiceItem) => {
    if (editingItem) {
      setItems(items.map(i => i.id === item.id ? item : i))
    } else {
      setItems([...items, { ...item, id: Date.now().toString() }])
    }
    setEditingItem(undefined)
    setOpenItemDialog(false)
    updateTotals()
  }

  const handleDeleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId))
    updateTotals()
  }

  const updateTotals = () => {
    const subTotal = items.reduce((sum, item) => sum + item.total, 0)
    setFormData(prev => ({
      ...prev,
      subTotal,
      totalAmount: subTotal, // Add tax calculation here if needed
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {invoice ? "Edit Invoice" : "Create New Invoice"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <InvoiceForm
            data={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            customers={MOCK_CUSTOMERS}
            addresses={MOCK_ADDRESSES}
          />
          <div>
            <InvoiceItemsTable
              items={items}
              onAdd={() => {
                setEditingItem(undefined)
                setOpenItemDialog(true)
              }}
              onEdit={(item) => {
                setEditingItem(item)
                setOpenItemDialog(true)
              }}
              onDelete={handleDeleteItem}
            />
          </div>
        </div>
      </DialogContent>
      <InvoiceItemDialog
        open={openItemDialog}
        onOpenChange={setOpenItemDialog}
        item={editingItem}
        onSubmit={handleAddItem}
      />
    </Dialog>
  )
}

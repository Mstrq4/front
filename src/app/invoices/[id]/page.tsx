"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { InvoiceForm } from "../components/invoice-form"
import { InvoiceItemsTable } from "../components/invoice-items-table"
import { InvoiceItemDialog } from "../components/invoice-item-dialog"
import { Button } from "@/components/ui/button"
import { InvoiceFormData, InvoiceItem } from "@/types"

export default function InvoicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: "",
    status: "draft",
    customer: {
      name: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
    },
    items: [],
  })
  const [itemDialogOpen, setItemDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<InvoiceItem | undefined>()

  useEffect(() => {
    // Fetch invoice data if editing existing invoice
    if (params.id !== "new") {
      // Add your fetch logic here
    }
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Add your save/update logic here
      router.push("/invoices")
    } catch (error) {
      console.error("Failed to save invoice:", error)
    }
  }

  const handleAddItem = () => {
    setSelectedItem(undefined)
    setItemDialogOpen(true)
  }

  const handleEditItem = (item: InvoiceItem) => {
    setSelectedItem(item)
    setItemDialogOpen(true)
  }

  const handleDeleteItem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }))
  }

  const handleItemSubmit = (item: InvoiceItem) => {
    setFormData((prev) => ({
      ...prev,
      items: selectedItem
        ? prev.items.map((i) => (i.id === item.id ? item : i))
        : [...prev.items, item],
    }))
    setItemDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">
            {params.id === "new" ? "Create Invoice" : "Edit Invoice"}
          </h1>
          <Button type="submit" form="invoice-form">
            Save Invoice
          </Button>
        </div>
        <InvoiceForm
          data={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
        />
        <InvoiceItemsTable
          items={formData.items}
          onAdd={handleAddItem}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
        />
        <InvoiceItemDialog
          open={itemDialogOpen}
          onOpenChange={setItemDialogOpen}
          item={selectedItem}
          onSubmit={handleItemSubmit}
        />
      </div>
    </div>
  )
}

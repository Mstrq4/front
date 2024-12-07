"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InvoiceTable } from "./components/invoice-table"
import { InvoiceDialog } from "./components/invoice-dialog"
import { useState } from "react"

export default function InvoicesPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Invoices Management</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Invoice
        </Button>
      </div>
      <InvoiceTable />
      <InvoiceDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

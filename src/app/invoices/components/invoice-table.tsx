"use client"

import { useState } from "react"
import { Invoice } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { InvoiceStatusBadge } from "./invoice-status-badge"
import { InvoiceActions } from "./invoice-actions"
import { formatDate, formatCurrency } from "@/lib/utils"

// Mock data
const MOCK_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNo: "INV-2023-001",
    date: "2023-12-01",
    dueDate: "2023-12-31",
    status: "pending",
    subTotal: 1000,
    totalAmount: 1100,
    customerId: "1",
    addressId: "1",
    customer: {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    address: {
      id: "1",
      userId: "1",
      address: "123 Main St",
      cityId: "1",
      postalCode: "12345",
      createdAt: new Date().toISOString()
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export function InvoiceTable() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice No</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.invoiceNo}</TableCell>
            <TableCell>{formatDate(invoice.date)}</TableCell>
            <TableCell>{formatDate(invoice.dueDate)}</TableCell>
            <TableCell>{invoice.customer?.name || "N/A"}</TableCell>
            <TableCell>
              <InvoiceStatusBadge status={invoice.status} />
            </TableCell>
            <TableCell className="text-right">
              {formatCurrency(invoice.totalAmount)}
            </TableCell>
            <TableCell>
              <InvoiceActions 
                invoice={invoice} 
                onDelete={(id) => {
                  setInvoices(invoices.filter(inv => inv.id !== id))
                }} 
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

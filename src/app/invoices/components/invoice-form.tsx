"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { InvoiceFormData, Customer, Address, InvoiceStatus } from "@/types"

const STATUS_OPTIONS: { label: string; value: InvoiceStatus }[] = [
  { label: "Draft", value: "draft" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Overdue", value: "overdue" },
  { label: "Cancelled", value: "cancelled" },
]

interface InvoiceFormProps {
  data: InvoiceFormData
  onChange: (data: InvoiceFormData) => void
  onSubmit: (event: React.FormEvent) => void
}

export function InvoiceForm({ data, onChange, onSubmit }: InvoiceFormProps) {
  const updateCustomer = (field: keyof Customer, value: string) => {
    onChange({
      ...data,
      customer: {
        ...data.customer,
        [field]: value,
      },
    })
  }

  const updateAddress = (field: keyof Address, value: string) => {
    onChange({
      ...data,
      customer: {
        ...data.customer,
        address: {
          ...data.customer.address,
          [field]: value,
        },
      },
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Invoice Details</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={data.invoiceNumber}
              onChange={(e) =>
                onChange({ ...data, invoiceNumber: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={data.status}
              onValueChange={(value: InvoiceStatus) =>
                onChange({ ...data, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Customer Information</h3>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.customer.name}
                onChange={(e) => updateCustomer("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.customer.email}
                onChange={(e) => updateCustomer("email", e.target.value)}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={data.customer.address.street}
              onChange={(e) => updateAddress("street", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={data.customer.address.city}
                onChange={(e) => updateAddress("city", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={data.customer.address.state}
                onChange={(e) => updateAddress("state", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input
                id="zip"
                value={data.customer.address.zip}
                onChange={(e) => updateAddress("zip", e.target.value)}
                required
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

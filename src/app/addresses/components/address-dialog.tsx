"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Address } from "@/types"

interface AddressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  addressId?: string | null
  currentAddress?: Address
  onSuccess?: (address: Address) => void
}

// Mock data for cities
const cities = [
  { id: "NY", name: "New York" },
  { id: "LA", name: "Los Angeles" },
  { id: "CH", name: "Chicago" },
  { id: "HO", name: "Houston" },
]

// Mock data for users
const users = [
  { id: "1", name: "John Doe" },
  { id: "2", name: "Jane Smith" },
]

const initialFormData = {
  userId: "",
  address: "",
  cityId: "",
  postalCode: "",
}

export function AddressDialog({ 
  open, 
  onOpenChange, 
  addressId, 
  currentAddress, 
  onSuccess 
}: AddressDialogProps) {
  const [formData, setFormData] = useState(initialFormData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentAddress) {
      setFormData({
        userId: currentAddress.userId,
        address: currentAddress.address,
        cityId: currentAddress.cityId,
        postalCode: currentAddress.postalCode,
      })
    } else {
      setFormData(initialFormData)
    }
  }, [currentAddress])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real application, make API call here
      const updatedAddress: Address = {
        id: addressId || Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      onSuccess?.(updatedAddress)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving address:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{addressId ? "Edit Address" : "Add New Address"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="userId">User</Label>
              <Select
                value={formData.userId}
                onValueChange={(value) =>
                  setFormData({ ...formData, userId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                required
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="cityId">City</Label>
              <Select
                value={formData.cityId}
                onValueChange={(value) =>
                  setFormData({ ...formData, cityId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
                <SelectContent>
                  {cities.map((city) => (
                    <SelectItem key={city.id} value={city.id}>
                      {city.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                required
                value={formData.postalCode}
                onChange={(e) =>
                  setFormData({ ...formData, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : addressId ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

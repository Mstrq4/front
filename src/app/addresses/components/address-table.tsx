"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
import { AddressDialog } from "./address-dialog"
import { Address } from "@/types"

// Mock data
const INITIAL_ADDRESSES: Address[] = [
  {
    id: "1",
    userId: "1",
    address: "123 Main St",
    cityId: "NY",
    postalCode: "10001",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    userId: "2",
    address: "456 Park Ave",
    cityId: "LA",
    postalCode: "90001",
    createdAt: new Date().toISOString(),
  },
]

export function AddressTable() {
  const [editingAddress, setEditingAddress] = useState<string | null>(null)
  const [deletingAddress, setDeletingAddress] = useState<string | null>(null)
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES)

  const handleDelete = (addressId: string) => {
    setAddresses(addresses.filter(address => address.id !== addressId))
    setDeletingAddress(null)
  }

  const handleAddressUpdate = (updatedAddress: Address) => {
    setAddresses(addresses.map(address => 
      address.id === updatedAddress.id ? updatedAddress : address
    ))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User ID</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addresses.map((address) => (
            <TableRow key={address.id}>
              <TableCell>{address.userId}</TableCell>
              <TableCell className="font-medium">{address.address}</TableCell>
              <TableCell>{address.cityId}</TableCell>
              <TableCell>{address.postalCode}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setEditingAddress(address.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setDeletingAddress(address.id)}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddressDialog
        open={!!editingAddress}
        onOpenChange={() => setEditingAddress(null)}
        addressId={editingAddress}
        currentAddress={addresses.find(a => a.id === editingAddress)}
        onSuccess={(updatedAddress) => {
          handleAddressUpdate(updatedAddress)
          setEditingAddress(null)
        }}
      />

      <AlertDialog open={!!deletingAddress} onOpenChange={() => setDeletingAddress(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deletingAddress && handleDelete(deletingAddress)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

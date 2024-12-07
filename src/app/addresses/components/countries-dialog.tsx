"use client"

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Country } from "@/types"
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash } from "lucide-react"
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

// Mock data
const INITIAL_COUNTRIES: Country[] = [
  {
    id: "1",
    name: "United States",
    code: "US",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "United Kingdom",
    code: "GB",
    createdAt: new Date().toISOString(),
  },
]

interface CountryFormData {
  name: string
  code: string
}

interface EditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentCountry?: Country
  onSuccess: (country: Country) => void
}

function EditDialog({ open, onOpenChange, currentCountry, onSuccess }: EditDialogProps) {
  const [formData, setFormData] = useState<CountryFormData>({
    name: "",
    code: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentCountry) {
      setFormData({
        name: currentCountry.name,
        code: currentCountry.code,
      })
    } else {
      setFormData({ name: "", code: "" })
    }
  }, [currentCountry])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const updatedCountry: Country = {
        id: currentCountry?.id || Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      onSuccess(updatedCountry)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving country:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentCountry ? "Edit Country" : "Add New Country"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Country Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Country Code</Label>
              <Input
                id="code"
                required
                maxLength={2}
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value.toUpperCase() })
                }
                placeholder="e.g. US"
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
              {loading ? "Saving..." : currentCountry ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface CountriesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CountriesDialog({ open, onOpenChange }: CountriesDialogProps) {
  const [countries, setCountries] = useState<Country[]>(INITIAL_COUNTRIES)
  const [editingCountry, setEditingCountry] = useState<Country | undefined>()
  const [deletingCountry, setDeletingCountry] = useState<string | null>(null)
  const [showAddEdit, setShowAddEdit] = useState(false)

  const handleDelete = (countryId: string) => {
    setCountries(countries.filter(country => country.id !== countryId))
    setDeletingCountry(null)
  }

  const handleSuccess = (updatedCountry: Country) => {
    setCountries(countries.map(country => 
      country.id === updatedCountry.id ? updatedCountry : country
    ).concat(
      countries.find(country => country.id === updatedCountry.id) ? [] : [updatedCountry]
    ))
    setShowAddEdit(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Countries Management</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setEditingCountry(undefined)
              setShowAddEdit(true)
            }}>
              Add Country
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell className="font-medium">{country.name}</TableCell>
                  <TableCell>{country.code}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setEditingCountry(country)
                            setShowAddEdit(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeletingCountry(country.id)}
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
        </DialogContent>
      </Dialog>

      <EditDialog
        open={showAddEdit}
        onOpenChange={setShowAddEdit}
        currentCountry={editingCountry}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={!!deletingCountry} onOpenChange={() => setDeletingCountry(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the country.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deletingCountry && handleDelete(deletingCountry)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

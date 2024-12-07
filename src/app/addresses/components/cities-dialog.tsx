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
import { City, State } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash, Plus } from "lucide-react"
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
const MOCK_STATES: State[] = [
  {
    id: "1",
    name: "California",
    code: "CA",
    countryId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const INITIAL_CITIES: City[] = [
  {
    id: "1",
    name: "Los Angeles",
    stateId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

interface CityFormData {
  name: string
  stateId: string
}

interface EditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentCity?: City
  onSuccess: (city: City) => void
}

function EditDialog({ open, onOpenChange, currentCity, onSuccess }: EditDialogProps) {
  const [formData, setFormData] = useState<CityFormData>({
    name: "",
    stateId: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentCity) {
      setFormData({
        name: currentCity.name,
        stateId: currentCity.stateId,
      })
    } else {
      setFormData({ name: "", stateId: "" })
    }
  }, [currentCity])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const now = new Date().toISOString()
      const updatedCity: City = {
        id: currentCity?.id || Date.now().toString(),
        ...formData,
        createdAt: currentCity?.createdAt || now,
        updatedAt: now,
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      onSuccess(updatedCity)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving city:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentCity ? "Edit City" : "Add New City"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">City Name</Label>
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
              <Label htmlFor="stateId">State</Label>
              <Select
                value={formData.stateId}
                onValueChange={(value) =>
                  setFormData({ ...formData, stateId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_STATES.map((state) => (
                    <SelectItem key={state.id} value={state.id}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
              {loading ? "Saving..." : currentCity ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface CitiesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CitiesDialog({ open, onOpenChange }: CitiesDialogProps) {
  const [cities, setCities] = useState<City[]>(INITIAL_CITIES)
  const [editingCity, setEditingCity] = useState<City | undefined>()
  const [deletingCity, setDeletingCity] = useState<string | null>(null)
  const [showAddEdit, setShowAddEdit] = useState(false)

  const handleDelete = (cityId: string) => {
    setCities(cities.filter(city => city.id !== cityId))
    setDeletingCity(null)
  }

  const handleSuccess = (updatedCity: City) => {
    setCities(cities.map(city => 
      city.id === updatedCity.id ? updatedCity : city
    ).concat(
      cities.find(city => city.id === updatedCity.id) ? [] : [updatedCity]
    ))
    setShowAddEdit(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Cities Management</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setEditingCity(undefined)
              setShowAddEdit(true)
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add City
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>State</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cities.map((city) => (
                <TableRow key={city.id}>
                  <TableCell className="font-medium">{city.name}</TableCell>
                  <TableCell>
                    {MOCK_STATES.find(s => s.id === city.stateId)?.name}
                  </TableCell>
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
                            setEditingCity(city)
                            setShowAddEdit(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeletingCity(city.id)}
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
        currentCity={editingCity}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={!!deletingCity} onOpenChange={() => setDeletingCity(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the city.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deletingCity && handleDelete(deletingCity)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}


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
import { State, Country } from "@/types"
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
const MOCK_COUNTRIES: Country[] = [
  { id: "1", name: "United States", code: "US", createdAt: new Date().toISOString() },
  { id: "2", name: "Canada", code: "CA", createdAt: new Date().toISOString() },
]

const INITIAL_STATES: State[] = [
  {
    id: "1",
    name: "California",
    code: "CA",
    countryId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

interface StateFormData {
  name: string
  code: string
  countryId: string
}

interface EditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentState?: State
  onSuccess: (state: State) => void
}

function EditDialog({ open, onOpenChange, currentState, onSuccess }: EditDialogProps) {
  const [formData, setFormData] = useState<StateFormData>({
    name: "",
    code: "",
    countryId: "",
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentState) {
      setFormData({
        name: currentState.name,
        code: currentState.code,
        countryId: currentState.countryId,
      })
    } else {
      setFormData({ name: "", code: "", countryId: "" })
    }
  }, [currentState])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const now = new Date().toISOString()
      const updatedState: State = {
        id: currentState?.id || Date.now().toString(),
        ...formData,
        createdAt: currentState?.createdAt || now,
        updatedAt: now,
      }

      await new Promise(resolve => setTimeout(resolve, 1000))
      onSuccess(updatedState)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving state:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {currentState ? "Edit State" : "Add New State"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">State Name</Label>
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
              <Label htmlFor="code">State Code</Label>
              <Input
                id="code"
                required
                maxLength={2}
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value.toUpperCase() })
                }
                placeholder="e.g. CA"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="countryId">Country</Label>
              <Select
                value={formData.countryId}
                onValueChange={(value) =>
                  setFormData({ ...formData, countryId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
                <SelectContent>
                  {MOCK_COUNTRIES.map((country) => (
                    <SelectItem key={country.id} value={country.id}>
                      {country.name}
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
              {loading ? "Saving..." : currentState ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

interface StatesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function StatesDialog({ open, onOpenChange }: StatesDialogProps) {
  const [states, setStates] = useState<State[]>(INITIAL_STATES)
  const [editingState, setEditingState] = useState<State | undefined>()
  const [deletingState, setDeletingState] = useState<string | null>(null)
  const [showAddEdit, setShowAddEdit] = useState(false)

  const handleDelete = (stateId: string) => {
    setStates(states.filter(state => state.id !== stateId))
    setDeletingState(null)
  }

  const handleSuccess = (updatedState: State) => {
    setStates(states.map(state => 
      state.id === updatedState.id ? updatedState : state
    ).concat(
      states.find(state => state.id === updatedState.id) ? [] : [updatedState]
    ))
    setShowAddEdit(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>States Management</DialogTitle>
          </DialogHeader>
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setEditingState(undefined)
              setShowAddEdit(true)
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add State
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Country</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {states.map((state) => (
                <TableRow key={state.id}>
                  <TableCell className="font-medium">{state.name}</TableCell>
                  <TableCell>{state.code}</TableCell>
                  <TableCell>
                    {MOCK_COUNTRIES.find(c => c.id === state.countryId)?.name}
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
                            setEditingState(state)
                            setShowAddEdit(true)
                          }}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => setDeletingState(state.id)}
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
        currentState={editingState}
        onSuccess={handleSuccess}
      />

      <AlertDialog open={!!deletingState} onOpenChange={() => setDeletingState(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the state.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deletingState && handleDelete(deletingState)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

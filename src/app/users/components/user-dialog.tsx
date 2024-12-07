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
import { User, UserFormData } from "@/types"

interface UserDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId?: string | null
  currentUser?: User
  onSuccess?: (user: User) => void
}

const roles = [
  { id: "admin", name: "Administrator" },
  { id: "user", name: "Regular User" },
  { id: "editor", name: "Editor" },
]

const initialFormData: UserFormData = {
  username: "",
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  roleId: "user",
}

export function UserDialog({ open, onOpenChange, userId, currentUser, onSuccess }: UserDialogProps) {
  const [formData, setFormData] = useState<UserFormData>(initialFormData)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentUser) {
      setFormData({
        username: currentUser.username,
        email: currentUser.email,
        password: "",
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        roleId: currentUser.roleId,
      })
    } else {
      setFormData(initialFormData)
    }
  }, [currentUser])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real application, make API call here
      const updatedUser: User = {
        id: userId || Date.now().toString(),
        ...formData,
        settings: {},
        createdAt: new Date().toISOString(),
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      onSuccess?.(updatedUser)
      onOpenChange(false)
    } catch (error) {
      console.error('Error saving user:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{userId ? "Edit User" : "Create User"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                required
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            {!userId && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required={!userId}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="roleId">Role</Label>
              <Select
                value={formData.roleId}
                onValueChange={(value) =>
                  setFormData({ ...formData, roleId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
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
              {loading ? "Saving..." : userId ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

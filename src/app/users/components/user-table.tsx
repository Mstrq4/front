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
import { UserDialog } from "./user-dialog"
import { User } from "@/types"

// Mock data - نقل البيانات التجريبية إلى متغير منفصل
const INITIAL_USERS: User[] = [
  {
    id: "1",
    username: "john_doe",
    email: "john@example.com",
    firstName: "John",
    lastName: "Doe",
    password: "",
    settings: {
      theme: 'light',
      notifications: true,
      language: 'en',
      timezone: 'UTC'
    },
    roleId: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    username: "jane_smith",
    email: "jane@example.com",
    firstName: "Jane",
    lastName: "Smith",
    password: "",
    settings: {
      theme: 'dark',
      notifications: true,
      language: 'en',
      timezone: 'UTC'
    },
    roleId: "user",
    createdAt: new Date().toISOString(),
  },
]

export function UserTable() {
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [deletingUser, setDeletingUser] = useState<string | null>(null)
  const [users, setUsers] = useState<User[]>(INITIAL_USERS)

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
    setDeletingUser(null)
  }

  const handleUserUpdate = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ))
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium
                  ${user.roleId === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                  {user.roleId}
                </span>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => setEditingUser(user.id)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => setDeletingUser(user.id)}
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

      <UserDialog
        open={!!editingUser}
        onOpenChange={() => setEditingUser(null)}
        userId={editingUser}
        currentUser={users.find(u => u.id === editingUser)}
        onSuccess={(updatedUser) => {
          handleUserUpdate(updatedUser)
          setEditingUser(null)
        }}
      />

      <AlertDialog open={!!deletingUser} onOpenChange={() => setDeletingUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the user
              and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() => deletingUser && handleDelete(deletingUser)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

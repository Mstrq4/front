"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UserTable } from "./components/user-table"
import { UserDialog } from "./components/user-dialog"
import { useState } from "react"

export default function UsersPage() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Users Management</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>
      <UserTable />
      <UserDialog open={open} onOpenChange={setOpen} />
    </div>
  )
}

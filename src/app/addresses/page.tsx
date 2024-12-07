"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddressTable } from "./components/address-table"
import { AddressDialog } from "./components/address-dialog"
import { CountriesDialog } from "./components/countries-dialog"
import { StatesDialog } from "./components/states-dialog"
import { CitiesDialog } from "./components/cities-dialog"
import { useState } from "react"

export default function AddressesPage() {
  const [openAddress, setOpenAddress] = useState(false)
  const [openCountries, setOpenCountries] = useState(false)
  const [openStates, setOpenStates] = useState(false)
  const [openCities, setOpenCities] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Addresses Management</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => setOpenCountries(true)}>
            Manage Countries
          </Button>
          <Button variant="outline" onClick={() => setOpenStates(true)}>
            Manage States
          </Button>
          <Button variant="outline" onClick={() => setOpenCities(true)}>
            Manage Cities
          </Button>
          <Button onClick={() => setOpenAddress(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Address
          </Button>
        </div>
      </div>
      <AddressTable />
      <AddressDialog open={openAddress} onOpenChange={setOpenAddress} />
      <CountriesDialog open={openCountries} onOpenChange={setOpenCountries} />
      <StatesDialog open={openStates} onOpenChange={setOpenStates} />
      <CitiesDialog open={openCities} onOpenChange={setOpenCities} />
    </div>
  )
}

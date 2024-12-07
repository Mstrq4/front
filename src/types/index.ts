// types/index.ts

// User types
export type User = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  password: string
  settings: UserSettings
  roleId: string
  createdAt: string
}

export type UserSettings = {
  theme?: 'light' | 'dark'
  notifications?: boolean
  language?: string
  timezone?: string
}

export type UserFormData = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  roleId: string
}

// Address types
export type Address = {
  id: string
  userId: string
  address: string
  cityId: string
  postalCode: string
  createdAt: string
}

export type AddressFormData = {
  userId: string
  address: string
  cityId: string
  postalCode: string
}

// Country types
export type Country = {
  id: string
  name: string
  code: string
  createdAt: string
}

export type CountryFormData = {
  name: string
  code: string
}

// City types
export type City = {
  id: string
  name: string
  stateId: string
  createdAt: string
  updatedAt: string
}

export type CityFormData = {
  name: string
  stateId: string
}

// Role types
export type Role = {
  id: string
  name: string
  permissions: string[]
  createdAt: string
}

// Common types
export type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export type WithId<T> = T & {
  id: string
}

export type WithTimestamp<T> = T & {
  createdAt: string
  updatedAt?: string
}

// API Response types
export type ApiResponse<T> = {
  data: T
  message?: string
  success: boolean
}

export type PaginatedResponse<T> = {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// Form types
export type FormState = {
  loading: boolean
  error?: string | null
  success?: boolean
}

// Select Option type
export type SelectOption = {
  label: string
  value: string
}

// State types
export type State = {
  id: string
  name: string
  code: string
  countryId: string
  createdAt: string
  updatedAt: string
}

export type StateFormData = {
  name: string
  code: string
  countryId: string
}

// Table types
export type SortDirection = 'asc' | 'desc'

export type TableSort = {
  column: string
  direction: SortDirection
}

export type TableFilter = {
  column: string
  value: string
}

export type TablePagination = {
  page: number
  limit: number
}

// Customer Types
export type Customer = {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
  updatedAt: string
}

export type CustomerFormData = {
  name: string
  email: string
  phone: string
}

// Invoice Status Type
export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue' | 'cancelled'

// Invoice Types
export type Invoice = WithTimestamp<{
  id: string
  invoiceNo: string
  date: string
  dueDate: string
  status: InvoiceStatus
  subTotal: number
  totalAmount: number
  customerId: string
  addressId: string
  items?: InvoiceItem[]
  customer?: Customer
  address?: Address
}>

export type InvoiceFormData = {
  invoiceNo: string
  date: string
  dueDate: string
  status: InvoiceStatus
  subTotal: number
  totalAmount: number
  customerId: string
  addressId: string
}

// Invoice Item Types
export type InvoiceItem = WithTimestamp<{
  id: string
  invoiceId?: string
  description: string
  quantity: number
  price: number
  total: number
}>

export type InvoiceItemFormData = Omit<InvoiceItem, 'id' | 'createdAt' | 'updatedAt'>

// Invoice Dialog Props
export type InvoiceDialogProps = DialogProps & {
  invoice?: Invoice
}

// Invoice Actions Props
export type InvoiceActionsProps = {
  invoice: Invoice
  onDelete: (id: string) => void
}

// Invoice Table Props
export type InvoiceTableProps = {
  invoices: Invoice[]
  onDelete?: (id: string) => void
}

// Invoice Items Table Props
export type InvoiceItemsTableProps = {
  items: InvoiceItem[]
  onAdd: () => void
  onEdit: (item: InvoiceItem) => void
  onDelete: (id: string) => void
}

// Invoice Item Dialog Props
export type InvoiceItemDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  item?: InvoiceItem
  onSubmit: (item: InvoiceItem) => void
}

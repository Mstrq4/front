import { Badge } from "@/components/ui/badge"
import { InvoiceStatus } from "@/types"

const statusConfig: Record<InvoiceStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Draft", variant: "secondary" },
  pending: { label: "Pending", variant: "outline" },
  paid: { label: "Paid", variant: "default" },
  overdue: { label: "Overdue", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "destructive" },
}

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus
}

export function InvoiceStatusBadge({ status }: InvoiceStatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  )
}

// components/Navbar.tsx
import { Bell, Globe, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  pageName: string;
}

export function Navbar({ pageName }: NavbarProps) {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex-1">
          <h2 className="text-2xl font-bold">{pageName}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Globe className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

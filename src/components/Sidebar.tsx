"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import * as Icons from "lucide-react"
import { Page } from "@/interfaces/Page"
import { LucideIcon } from 'lucide-react'

interface SidebarProps {
  pages: Page[]
}

export function Sidebar({ pages }: SidebarProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (path: string) => {
    setOpenMenus(prev =>
      prev.includes(path)
        ? prev.filter(p => p !== path)
        : [...prev, path]
    )
  }

  const IconComponent = (iconName: string) => {
    const formattedIconName = iconName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');

    const Icon = (Icons as unknown as Record<string, LucideIcon>)[formattedIconName] || Icons.Circle;
    return <Icon className="h-4 w-4" />;
  }

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] p-0">
          <SidebarContent pages={pages} pathname={pathname} openMenus={openMenus} toggleMenu={toggleMenu} IconComponent={IconComponent} />
        </SheetContent>
      </Sheet>
      <div className="hidden lg:block w-[240px] border-r">
        <SidebarContent pages={pages} pathname={pathname} openMenus={openMenus} toggleMenu={toggleMenu} IconComponent={IconComponent} />
      </div>
    </>
  )
}

interface SidebarContentProps {
  pages: Page[]
  pathname: string
  openMenus: string[]
  toggleMenu: (path: string) => void
  IconComponent: (iconName: string) => JSX.Element
}

function SidebarContent({ pages, pathname, openMenus, toggleMenu, IconComponent }: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header - Fixed */}
      <div className="h-16 p-4 border-b">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      
      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-4">
          {pages.map((page) => (
            <div key={page.path}>
              {page.subPages ? (
                <div className="space-y-1">
                  <Button
                    variant={pathname === page.path ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-between",
                      pathname === page.path && "bg-muted"
                    )}
                    onClick={() => toggleMenu(page.path)}
                  >
                    <div className="flex items-center">
                      {IconComponent(page.icon)}
                      <span className="ml-2">{page.name}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        openMenus.includes(page.path) && "rotate-180"
                      )}
                    />
                  </Button>
                  {openMenus.includes(page.path) && (
                    <div className="pl-4 space-y-1">
                      {page.subPages.map((subPage) => (
                        <Button
                          key={subPage.path}
                          variant={pathname === subPage.path ? "secondary" : "ghost"}
                          className={cn(
                            "w-full justify-start",
                            pathname === subPage.path && "bg-muted"
                          )}
                          asChild
                        >
                          <Link href={subPage.path.replace(/\[.*?\]/, '1')}>
                            <div className="flex items-center">
                              {IconComponent(subPage.icon)}
                              <span className="ml-2">{subPage.name}</span>
                            </div>
                          </Link>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant={pathname === page.path ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === page.path && "bg-muted"
                  )}
                  asChild
                >
                  <Link href={page.path}>
                    <div className="flex items-center">
                      {IconComponent(page.icon)}
                      <span className="ml-2">{page.name}</span>
                    </div>
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

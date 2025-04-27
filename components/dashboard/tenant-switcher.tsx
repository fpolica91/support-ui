"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
import { cn } from "@/lib/utils"

const tenants = [
  {
    id: "1",
    name: "Acme Inc",
  },
  {
    id: "2",
    name: "Globex Corporation",
  },
  {
    id: "3",
    name: "Initech",
  },
]

export function TenantSwitcher() {
  const [open, setOpen] = useState(false)
  const [selectedTenant, setSelectedTenant] = useState(tenants[0])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a tenant"
          className="w-full justify-between"
        >
          {selectedTenant.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tenant..." />
          <CommandList>
            <CommandEmpty>No tenant found.</CommandEmpty>
            <CommandGroup>
              {tenants.map((tenant) => (
                <CommandItem
                  key={tenant.id}
                  onSelect={() => {
                    setSelectedTenant(tenant)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  {tenant.name}
                  <Check
                    className={cn("ml-auto h-4 w-4", selectedTenant.id === tenant.id ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronsUpDown } from "lucide-react"
import { Button } from "@/packages/ui/Button"
import { regions } from "@/utils/mockedContent"
import { FormActionTypes } from "../Form/formReducer"

type ComboboxProps = {
  value: string | null
  dispatch: React.Dispatch<any>
  error: string
}

export function Combobox({ value, dispatch, error }: ComboboxProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const setSelectValue = (value: string) => {
    dispatch({ type: FormActionTypes.SELECTED_REGION, selectedRegion: value })
    setSearchTerm("")
    setOpen(false)
  }

  const filteredRegions = regions.filter((region) =>
    region.value.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="w-full relative" ref={dropdownRef}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-full justify-between flex border-black h-12 px-4"
        onClick={() => setOpen(!open)}
      >
        {value
          ? regions.find((region) => region.value === value)?.value ?? "Область"
          : <span className="truncate text-xs">Оберіть область</span>}
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {open && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Пошук областей"
              className="w-full py-2 px-3 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="py-1">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => (
                <div
                  key={region.value}
                  className="px-4 py-2 hover:bg-primary hover:bg-opacity-10 transition-all cursor-pointer"
                  onClick={() => setSelectValue(region.value)}
                >
                  {region.value}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">Нічого не знайдено</div>
            )}
          </div>
        </div>
      )}

      {!value && (
        <span className="absolute top-full left-0 text-red-500 text-xs">{error}</span>
      )}
    </div>
  )
}

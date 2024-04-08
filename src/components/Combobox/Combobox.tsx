import * as React from "react"
import { useState } from "react"
import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/packages/ui/Popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/packages/ui/Command";
import { Button } from "@/packages/ui/Button";
import { regions } from "@/utils/mockedContent";
import { FormActionTypes } from "../Form/formReducer";

type ComboboxProps = {
  value: string | null,
  dispatch: React.Dispatch<any>,
  error: string,
};

export function Combobox({ value, dispatch, error }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  const setSelectValue = (value: string) => {
    dispatch({ type: FormActionTypes.SELECTED_REGION, selectedRegion: value });
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className="w-full relative">
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between flex border-black h-12 px-4"
          >
            {value
              ? regions && (regions.find((region) => region.value === value)?.value ?? 'Область')
              : <span className="truncate text-xs">Оберіть область, в якій знаходиться роботодавець</span>}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        {!value ? (
            <span className="absolute top-full left-0 text-red-500 text-xs">{ error }</span>
        ): null}

        <PopoverContent className="bg-white w-full h-96 overflow-auto" hideWhenDetached align="start">
          <Command className="block">
            <CommandInput placeholder='Пошук областей' className="py-2 outline-none"/>

            <CommandEmpty>
              {'No results found'}
            </CommandEmpty>

            <CommandList className="mt-2">
              <CommandGroup>
                {regions && (
                  regions.map((region) => (
                    <CommandItem
                      className="py-2 hover:bg-primary hover:bg-opacity-10 transition-all"
                      key={region.value}
                      onSelect={(currentValue) => {
                        setSelectValue(currentValue === value ? '' : region.value)
                        setOpen(false)
                      }}
                    >
                      {region.value}
                    </CommandItem>
                  ))
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </div>
    </Popover>
  )
}

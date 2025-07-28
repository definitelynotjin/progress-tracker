"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"


import type { DateRange } from "react-day-picker"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

  const [range, setRange] = React.useState<DateRange | undefined>()

  return (
    <DayPicker
      mode="range"
      selected={range}
      onSelect={setRange}
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      className={cn(
        "bg-gray-600 text-white group/calendar p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button_previous>svg]:rotate-180`,
        className
      )}
      classNames={{
        root: cn("w-fit bg-white rounded-lg shadow border border-gray-200", defaultClassNames.root),
        months: cn("flex flex-col gap-2 md:flex-row", defaultClassNames.months),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: cn("absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1", defaultClassNames.nav),
        button_previous: cn(buttonVariants({ variant: buttonVariant }), "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 bg-transparent text-gray-400 hover:text-gray-700", defaultClassNames.button_previous),
        button_next: cn(buttonVariants({ variant: buttonVariant }), "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50 bg-transparent text-gray-400 hover:text-gray-700", defaultClassNames.button_next),
        month_caption: cn("flex h-[--cell-size] w-full items-center justify-center px-[--cell-size] text-gray-700", defaultClassNames.month_caption),
        dropdowns: cn("flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium", defaultClassNames.dropdowns),
        dropdown_root: cn("border border-gray-200 rounded-md", defaultClassNames.dropdown_root),
        dropdown: cn("bg-white absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn("select-none font-medium text-gray-700", captionLayout === "label" ? "text-sm" : "[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5", defaultClassNames.caption_label),
        table: "w-full border-collapse",
        weekdays: cn("flex border-b border-gray-200", defaultClassNames.weekdays),
        weekday: cn("text-gray-400 flex-1 select-none rounded-md text-[0.8rem] font-medium", defaultClassNames.weekday),
        week: cn("mt-2 flex w-full", defaultClassNames.week),
        week_number_header: cn("w-[--cell-size] select-none", defaultClassNames.week_number_header),
        week_number: cn("text-gray-300 select-none text-[0.8rem]", defaultClassNames.week_number),
        day: cn("group/day relative aspect-square h-full w-full select-none p-0 text-center bg-white hover:bg-gray-100 rounded transition [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-r-md border border-transparent hover:border-gray-200", defaultClassNames.day),
        range_start: cn("bg-blue-100 text-blue-700 font-semibold ring-1 ring-blue-200", defaultClassNames.range_start),
        range_middle: cn("bg-blue-50 text-blue-600 font-normal", defaultClassNames.range_middle),
        range_end: cn("bg-blue-100 text-blue-700 font-semibold ring-1 ring-blue-200", defaultClassNames.range_end),
        today: cn("bg-gray-100 text-gray-700 rounded-md border border-gray-300", defaultClassNames.today),
        outside: cn("text-gray-300 aria-selected:text-gray-300", defaultClassNames.outside),
        disabled: cn("text-gray-200 opacity-50", defaultClassNames.disabled),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "bg-gray-600 text-white flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none rounded-md [&>span]:text-xs [&>span]:opacity-90 data-[selected-single=true]:bg-gray-100 data-[selected-single=true]:text-gray-7700",
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  )
}

export { Calendar, CalendarDayButton }

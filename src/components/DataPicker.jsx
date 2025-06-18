import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent
} from "@material-tailwind/react"
import { format } from "date-fns"
import { DayPicker } from "react-day-picker"
import { es } from "react-day-picker/locale"
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline"
import "react-day-picker/style.css"


const DatePicker = ({ date, setDate }) => {
  return (
    <Popover placement="bottom">
      <PopoverHandler>
        <Input
          label={"Fecha"}
          variant="static"
          onChange={() => null}
          value={date ? format(date, "dd/MM/yyyy") : ""}
        />
      </PopoverHandler>
      <PopoverContent>
        <DayPicker
          animate
          mode="single"
          selected={date}
          onSelect={setDate}
          locale={es}
          showOutsideDays
          className="border-0"
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePicker
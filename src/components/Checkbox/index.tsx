import { Check } from 'phosphor-react'
import { useState } from 'react'

interface CheckboxProps {
  label: string
  checked: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function Checkbox({
  label,
  onCheckedChange,
  checked = false,
}: CheckboxProps) {
  const [isChecked, setIsChecked] = useState<boolean>(checked)

  function spaceBarPress(e: any) {
    if (e.code === 'Space') {
      setIsChecked((state) => !state)
    }
  }

  function handleCheckboxClick() {
    setIsChecked((state) => !state)

    if (onCheckedChange) {
      onCheckedChange(!isChecked)
    }
  }

  return (
    <>
      <div className="flex items-center [&>*]:cursor-pointer">
        <span
          tabIndex={0}
          onClick={handleCheckboxClick}
          onKeyUp={spaceBarPress}
          className={`absolute h-5 w-5 rounded flex justify-center items-center 
		  	focus:outline outline-2 outline-teal-800
		  	${
          isChecked
            ? 'bg-teal-600 hover:bg-teal-700'
            : 'bg-neutral-900 hover:bg-neutral-950'
        }
		  `}
        >
          {isChecked ? <Check /> : false}
        </span>
        <label
          className="ml-7 text-sm font-medium text-gray-300"
          onClick={handleCheckboxClick}
        >
          {label}
        </label>
      </div>
    </>
  )
}

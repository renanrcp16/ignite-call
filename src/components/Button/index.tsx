import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  icon?: ReactNode
  classname?: string
}

export function Button({ label, icon, classname, ...props }: ButtonProps) {
  return (
    <button
      className={`
	  	text-sm flex items-center justify-center py-2 px-3 rounded-md 
		bg-teal-700 hover:bg-teal-600 focus:outline outline-2 
		outline-teal-900 disabled:opacity-50 h-10
		${classname}
	`}
      {...props}
    >
      {label}
      {icon ?? false}
    </button>
  )
}

import { HTMLProps } from 'react'

interface FormProps extends HTMLProps<HTMLFormElement> {
  classname: string
}

export function Form({ classname, ...props }: FormProps) {
  return (
    <form
      className={`flex bg-neutral-800 p-5 border border-neutral-700 rounded-md mt-4 gap-2 w-full ${classname}`}
      {...props}
    >
      {props.children}
    </form>
  )
}

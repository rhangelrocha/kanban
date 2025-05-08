import React from "react"
import { ControllerRenderProps } from "react-hook-form"

import Select from "react-select"
// import { colourOptions } from '../data';

const userOptions = [
  { value: "user1", label: "User 1" },
  { value: "user2", label: "User 2" },
  { value: "user3", label: "User 3" },
  { value: "user4", label: "User 4" },
  { value: "user5", label: "User 5" },
  { value: "user6", label: "User 6" },
  { value: "user7", label: "User 7" },
  { value: "user8", label: "User 8" },
  { value: "user9", label: "User 9" },
  { value: "user10", label: "User 10" },
  { value: "user11", label: "User 11" },
  { value: "user12", label: "User 12" },
  { value: "user13", label: "User 13" },
  { value: "user14", label: "User 14" },
  { value: "user15", label: "User 15" },
  { value: "user16", label: "User 16" },
  { value: "user17", label: "User 17" },
  { value: "user18", label: "User 18" },
  { value: "user19", label: "User 19" },
  { value: "user20", label: "User 20" },
  { value: "user21", label: "User 21" },
  { value: "user22", label: "User 22" },
  { value: "user23", label: "User 23" },
  { value: "user24", label: "User 24" },
  { value: "user25", label: "User 25" },
  { value: "user26", label: "User 26" },
  { value: "user27", label: "User 27" },
  { value: "user28", label: "User 28" },
  { value: "user29", label: "User 29" },
  { value: "user30", label: "User 30" },
  { value: "user31", label: "User 31" },
  { value: "user32", label: "User 32" },
  { value: "user33", label: "User 33" },
  { value: "user34", label: "User 34" },
]

const SelectMembros = (props: ControllerRenderProps) => (
  <Select
    {...props}
    inputId="membros"
    isMulti
    name="membros"
    placeholder="Selecione um usuário existente..."
    noOptionsMessage={() => "Nenhum usuário encontrado"}
    styles={{
      control: (baseStyles: React.CSSProperties, state: { isFocused: boolean }) => ({
        ...baseStyles,
        borderColor: state.isFocused
          ? "hsl(var(--ring)) !important"
          : "hsl(214.3 31.8% 91.4%)",
        boxShadow: "none !important",
      }),
    }}
  />
)

export default SelectMembros

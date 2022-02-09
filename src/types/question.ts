export type Option = {
  id: number
  text: string
  option_type: string
  order: number
  question: number
}

export type Question = {
  id: number
  name: string
  text: string
  order: number
  option_set: Option[]
}

import React from 'react'
import { Select } from 'shared/ui'
import { SortField } from 'shared/api/tasks'
import { useTasks } from '../../../app/providers'

const options = [
  {
    id: SortField.ID,
    label: 'Сортировать по ID',
    onClick: function () {
      console.log(this.label)
    },
  },
  {
    id: SortField.USERNAME,
    label: 'Сортировать по имени',
    onClick: function () {
      console.log(this.label)
    },
  },
  {
    id: SortField.EMAIL,
    label: 'Сортировать по эл.почте',
    onClick: function () {
      console.log(this.label)
    },
  },
  {
    id: SortField.STATUS,
    label: 'Сортировать по статусу',
    onClick: function () {
      console.log(this.label)
    },
  },
]

export const SortTask = (): JSX.Element => {
  const {
    state: { sortField, isAsc },
  } = useTasks()
  const currentSort = options.find((option) => option.id === sortField)

  return (
    <Select options={options} selected={<p>{options[0].label}</p>}>
      {options.map((option) => (
        <Select.Option key={option.id} option={option}>
          <button>{option.label}</button>
        </Select.Option>
      ))}
    </Select>
  )
}

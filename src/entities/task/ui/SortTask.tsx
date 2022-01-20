import React from 'react'
import { Select } from 'shared/ui'
import { SortField } from '../../../shared/api/tasks'

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
  return <Select options={options} selected={<p>{options[0].label}</p>} />
}

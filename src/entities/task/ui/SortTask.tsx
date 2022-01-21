import React from 'react'
import { Select } from 'shared/ui'
import { SortField } from 'shared/api/tasks'
import { useTasks } from 'app/providers'
import { ChevronIcon } from 'shared/ui/icons'

const options = [
  {
    id: SortField.ID,
    label: 'Сортировать по ID',
  },
  {
    id: SortField.USERNAME,
    label: 'Сортировать по имени',
  },
  {
    id: SortField.EMAIL,
    label: 'Сортировать по эл.почте',
  },
  {
    id: SortField.STATUS,
    label: 'Сортировать по статусу',
  },
]

export const SortTask = (): JSX.Element => {
  const {
    state: { sortField, isAsc },
    sortBy,
  } = useTasks()

  const currentSort = options.find((option) => option.id === sortField) ?? options[0]
  const handleOptionClick = (newSort: SortField) => {
    sortBy(newSort)
  }

  return (
    <Select>
      <Select.Target>
        <button className="flex items-center gap-2">
          {currentSort.label}
          <ChevronIcon direction={isAsc ? 'up' : 'down'} className="w-4 h-4" />
        </button>
      </Select.Target>
      <Select.Content>
        {options.map((option) => (
          <Select.Option key={option.id} option={option}>
            <button
              onClick={() => handleOptionClick(option.id)}
              className={option.id === currentSort.id ? 'font-bold' : ''}>
              {option.label}
            </button>
          </Select.Option>
        ))}
      </Select.Content>
    </Select>
  )
}

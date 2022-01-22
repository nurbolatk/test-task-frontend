import React from 'react'
import { Select } from 'shared/ui'
import { SortField } from 'shared/api/tasks'
import { ChevronIcon } from 'shared/ui/icons'
import { useSorting } from 'shared/utils'

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
  const { sortBy, sortDirection, sortField } = useSorting()
  const isAsc = sortDirection === 'asc'

  const currentSort = options.find((option) => option.id === sortField) ?? options[0]
  const handleOptionClick = (newSort: SortField) => {
    sortBy(newSort)
  }

  const directionIcon = <ChevronIcon direction={isAsc ? 'up' : 'down'} className="w-3 h-3" />

  return (
    <Select>
      <Select.Target>
        <button className="flex items-center gap-2">
          {currentSort.label}
          <ChevronIcon direction="down" className="w-3 h-3" />
        </button>
      </Select.Target>
      <Select.Content>
        {options.map((option) => {
          const isCurrent = option.id === currentSort.id
          return (
            <Select.Option key={option.id} option={option}>
              <button
                onClick={() => handleOptionClick(option.id)}
                className={isCurrent ? 'font-bold flex items-center gap-x-2' : ''}>
                {option.label}
                {isCurrent ? directionIcon : null}
              </button>
            </Select.Option>
          )
        })}
      </Select.Content>
    </Select>
  )
}

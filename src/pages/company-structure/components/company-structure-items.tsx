import type { FC } from 'react'

import type { CompanyDepartmentsResponse } from '@/entities/company-departments/api'

import CompanyStructureItem from './company-structure-item'

const CompanyStructureItems: FC<{ items: CompanyDepartmentsResponse['hydra:member']; indent?: number }> = ({ items, indent }) => {
    return items?.map((item) => (
        <CompanyStructureItem
            key={item.id}
            {...item}
            indent={indent}
        />
    ))
}

export default CompanyStructureItems

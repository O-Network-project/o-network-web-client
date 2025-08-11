import { OrganizationForm } from '../../components/OrganizationForm'
import { DoublePageLayout } from '../../../../layouts/DoublePageLayout'

import './style.scss'

export function OrganizationCreation() {
    return (
        <DoublePageLayout>
            <OrganizationForm />
        </DoublePageLayout>
    )
}

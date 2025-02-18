import { OrganizationForm } from '../../components/Forms/OrganizationForm'
import { DoublePageLayout } from '../../layout/DoublePageLayout'

import './style.scss'

export function OrganizationCreation() {
    return (
        <DoublePageLayout>
            <OrganizationForm />
        </DoublePageLayout>
    )
}

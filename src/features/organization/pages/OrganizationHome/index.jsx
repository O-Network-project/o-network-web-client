import { ScrollTopButton } from '../../../../components/Buttons/ScrollTopButton'
import { Feed } from '../../../../components/Feed'
import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'

import './style.scss'

export function OrganizationHome() {
    return (

        <AuthenticatedLayout>
            <Feed />
            <ScrollTopButton />
        </AuthenticatedLayout>

    )
}

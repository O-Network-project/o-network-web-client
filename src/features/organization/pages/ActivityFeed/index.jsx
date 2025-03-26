import { ScrollTopButton } from '../../../../components/Buttons/ScrollTopButton'
import { Feed } from '../../../../components/Feed'
import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'

import './style.scss'

export function ActivityFeed() {
    return (

        <AuthenticatedLayout>
            <Feed />
            <ScrollTopButton />
        </AuthenticatedLayout>

    )
}

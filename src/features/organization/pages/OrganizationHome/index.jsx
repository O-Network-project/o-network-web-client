import { ScrollTopButton } from '../../../../components/Buttons/ScrollTopButton'
import { ActivityFeed } from '../../../activity-feed/post/components/ActivityFeed'
import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'

import './style.scss'

export function OrganizationHome() {
    return (

        <AuthenticatedLayout>
            <ActivityFeed />
            <ScrollTopButton />
        </AuthenticatedLayout>

    )
}

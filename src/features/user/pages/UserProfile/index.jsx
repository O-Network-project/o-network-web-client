import { ActivityFeed } from '../../../activity-feed/post/components/ActivityFeed'
import { ScrollTopButton } from '../../../../components/Buttons/ScrollTopButton'
import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'
import { ProfileUserIdProvider } from '../../../activity-feed/post/contexts/ProfileUserIdProvider'
import './style.scss'

export function UserProfile() {
    return (

        <AuthenticatedLayout>
            <ProfileUserIdProvider>
                <ActivityFeed />
            </ProfileUserIdProvider>
            <ScrollTopButton />
        </AuthenticatedLayout>

    )
}

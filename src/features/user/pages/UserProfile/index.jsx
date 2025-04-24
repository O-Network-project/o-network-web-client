import { useParams } from 'react-router-dom'
import { ActivityFeed } from '../../../activity-feed/post/components/ActivityFeed'
import { ScrollTopButton } from '../../../../components/Buttons/ScrollTopButton'
import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'
import './style.scss'

export function UserProfile() {
    const { userId } = useParams()

    return (

        <AuthenticatedLayout>
            <ActivityFeed userIdUrl={parseInt(userId)} />
            <ScrollTopButton />
        </AuthenticatedLayout>

    )
}

import { useParams } from 'react-router-dom'
import { Feed } from '../../components/Feed'
import { ScrollTopButton } from '../../components/Buttons/ScrollTopButton'
import { AuthenticatedLayout } from '../../layout/AuthenticatedLayout'
import './style.scss'

export function UserProfile() {
    const { userId } = useParams()

    return (

        <AuthenticatedLayout>
            <Feed userIdUrl={parseInt(userId)} />
            <ScrollTopButton />
        </AuthenticatedLayout>

    )
}

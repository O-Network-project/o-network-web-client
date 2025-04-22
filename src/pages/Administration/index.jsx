import { AuthenticatedLayout } from '../../layouts/AuthenticatedLayout'
import { AdminMembers } from '../../features/admin/members-list/components/AdminMembers'
import { ScrollTopButton } from '../../components/Buttons/ScrollTopButton'
import './style.scss'

export function Administration() {
    return (
        <AuthenticatedLayout>
            <AdminMembers />
            <ScrollTopButton />
        </AuthenticatedLayout>
    )
}

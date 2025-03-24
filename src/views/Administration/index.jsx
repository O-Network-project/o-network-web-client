import { AuthenticatedLayout } from '../../layouts/AuthenticatedLayout'
import { AdminMembers } from '../../components/Admin/AdminMembers'
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

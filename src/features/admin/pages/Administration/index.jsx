import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'
import { MembersList } from '../../members-list/components/MembersList'
import { ScrollTopButton } from '../../../../components/Buttons/ScrollTopButton'
import './style.scss'

export function Administration() {
    return (
        <AuthenticatedLayout>
            <MembersList />
            <ScrollTopButton />
        </AuthenticatedLayout>
    )
}

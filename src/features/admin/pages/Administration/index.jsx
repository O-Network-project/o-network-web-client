import { AuthenticatedLayout } from '../../../../layouts/AuthenticatedLayout'
import { MembersList } from '../../members-list/components/MembersList'
import { ScrollTopButton } from '../../../../components/ScrollTopButton'
import './style.scss'
import { MembersListProvider } from '../../members-list/contexts/MembersListProvider'

export function Administration() {
    return (
        <AuthenticatedLayout>
            <MembersListProvider>
                <MembersList />
            </MembersListProvider>
            <ScrollTopButton />
        </AuthenticatedLayout>
    )
}

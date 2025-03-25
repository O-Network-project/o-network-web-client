import { ProfileForm } from '../../components/Forms/ProfileForm'
import { DoublePageLayout } from '../../layouts/DoublePageLayout'

import './style.scss'

export function ProfileSettings() {
    return (

        <DoublePageLayout>
            <ProfileForm />
        </DoublePageLayout>
    )
}

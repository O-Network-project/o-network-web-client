import { ProfileForm } from '../../components/Forms/ProfileForm'
import { DoublePageLayout } from '../../layouts/DoublePageLayout'

import './style.scss'

export function SignUp() {
    return (
        <DoublePageLayout>
            <ProfileForm />
        </DoublePageLayout>
    )
}

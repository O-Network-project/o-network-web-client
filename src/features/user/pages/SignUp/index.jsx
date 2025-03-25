import { ProfileForm } from '../../components/ProfileForm'
import { DoublePageLayout } from '../../../../layouts/DoublePageLayout'

import './style.scss'

export function SignUp() {
    return (
        <DoublePageLayout>
            <ProfileForm />
        </DoublePageLayout>
    )
}

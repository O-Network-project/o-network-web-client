import { ProfileForm } from '../../components/Forms/ProfileForm'
import { DoublePageLayout } from '../../layout/DoublePageLayout'

import './style.scss'

export function SignUp() {
    return (
        <DoublePageLayout>
            <ProfileForm />
        </DoublePageLayout>
    )
}

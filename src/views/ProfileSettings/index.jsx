import { ProfileForm } from '../../components/Forms/ProfileForm'
import { DoublePageLayout } from '../../layout/DoublePageLayout'

import './style.scss'

function ProfileSettings() {
    return (

        <DoublePageLayout>
            <ProfileForm />
        </DoublePageLayout>
    )
}
export { ProfileSettings }

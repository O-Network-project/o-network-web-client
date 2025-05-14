import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { getUserOrganizationName } from '../../../../user/store/userSelectors'

export function OrganizationActivityFeedHeader() {
    const organizationName = useSelector(getUserOrganizationName)

    return (
        <Typography variant="h5">
            {organizationName}
        </Typography>
    )
}

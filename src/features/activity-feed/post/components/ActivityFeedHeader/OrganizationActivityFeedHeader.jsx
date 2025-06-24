import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { selectUserOrganizationName } from '../../../../user/store/userSelectors'

export function OrganizationActivityFeedHeader() {
    const organizationName = useSelector(selectUserOrganizationName)

    return (
        <Typography variant="h5">
            {organizationName}
        </Typography>
    )
}

import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { OrganizationActivityFeedHeader } from './OrganizationActivityFeedHeader'
import { UserProfileActivityFeedHeader } from './UserProfileActivityFeedHeader'

import './style.scss'

export function ActivityFeedHeader() {
    const userId = parseInt(useParams().userId, 10)

    return (
        <Box className="c-feed-header" id="back-to-top-anchor">
            {userId
                ? <UserProfileActivityFeedHeader />
                : <OrganizationActivityFeedHeader />
            }
        </Box>
    )
}

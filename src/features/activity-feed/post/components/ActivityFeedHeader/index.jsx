import { useContext } from 'react'
import { Box } from '@mui/material'
import { ProfileUserIdContext } from '../../contexts/ProfileUserIdProvider'
import { OrganizationActivityFeedHeader } from './OrganizationActivityFeedHeader'
import { UserProfileActivityFeedHeader } from './UserProfileActivityFeedHeader'

import './style.scss'

export function ActivityFeedHeader() {
    const profileUserId = useContext(ProfileUserIdContext)

    return (
        <Box className="c-feed-header" id="back-to-top-anchor">
            {profileUserId
                ? <UserProfileActivityFeedHeader />
                : <OrganizationActivityFeedHeader />
            }
        </Box>
    )
}

import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { selectPostsCount } from '../../store/postsSelectors'
import { ProfileUserIdContext } from '../../contexts/ProfileUserIdProvider'

export function ActivityFeedPlaceholder() {
    const postsCount = useSelector(selectPostsCount)
    const profileUserId = useContext(ProfileUserIdContext)

    return (
        <Typography variant="body1">
            {postsCount > 0
                ? `Pas de posts plus anciens`
                : profileUserId
                    ? `Cet utilisateur n'a pas encore rédigé de post`
                    : `Aucun post n'a encore été publié dans cette organisation`
            }
        </Typography>
    )
}

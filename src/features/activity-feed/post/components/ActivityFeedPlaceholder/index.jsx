import { useContext } from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { getPosts } from '../../../../../redux/selectors/feed'
import { ProfileUserIdContext } from '../../contexts/ProfileUserIdProvider'

export function ActivityFeedPlaceholder() {
    const posts = useSelector(getPosts)
    const profileUserId = useContext(ProfileUserIdContext)

    return (
        <Typography variant="body1">
            {posts.length > 0
                ? `Pas de posts plus anciens`
                : profileUserId
                    ? `Cet utilisateur n'a pas encore rédigé de post`
                    : `Aucun post n'a encore été publié dans cette organisation`
            }
        </Typography>
    )
}

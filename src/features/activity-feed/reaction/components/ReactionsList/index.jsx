import { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress } from '@mui/material'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { selectPostHasFetchedReactions } from '../../../post/store/postsSelectors'
import { fetchReactions } from '../../store/reactionsThunks'
import { selectPostReactionIds } from '../../store/reactionsSelectors'
import { ReactionsListItem } from './ReactionsListItem'

export function ReactionsList() {
    const postId = useContext(PostIdContext)

    const reactionIds = useSelector(state => selectPostReactionIds(state, postId))
    const hasFetchedReactions = useSelector(state =>
        selectPostHasFetchedReactions(state, postId)
    )

    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (hasFetchedReactions) return

        (async () => {
            setIsLoading(true)

            try {
                await dispatch(fetchReactions(postId)).unwrap()
            } catch (error) {
                console.error(error) // TODO: instead of console logs, errors must be displayed directly to user
            } finally {
                setIsLoading(false)
            }
        })()
    }, [hasFetchedReactions, postId, dispatch])

    return (
        <Box className="c-reaction-post__info" sx={{
            minWidth: reactionIds.length === 0 ? 180 : null
        }}>
            {reactionIds.map(reactionId => (
                <ReactionsListItem
                    key={reactionId}
                    id={reactionId}
                />
            ))}
            {isLoading && <CircularProgress sx={{
                display: 'block',
                mx: 'auto',
                my: 2
            }} />}
        </Box>
    )
}

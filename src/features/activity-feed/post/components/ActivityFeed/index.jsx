import { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, CircularProgress } from '@mui/material'
import { PostIdProvider } from '../../contexts/PostIdProvider'
import { selectPostIds, selectActivityFeedHasMorePosts, selectPostLoading } from '../../store/postsSelectors'
import { fetchPosts } from '../../store/postsThunks'
import { cleanFeedState } from '../../store/postsSlice'
import { ProfileUserIdContext } from '../../contexts/ProfileUserIdProvider'
import { ActivityFeedHeader } from '../ActivityFeedHeader'
import { PostForm } from '../PostForm'
import { Post } from '../Post'
import { ActivityFeedPlaceholder } from '../ActivityFeedPlaceholder'

import './style.scss'

export function ActivityFeed() {
    const dispatch = useDispatch()
    const profileUserId = useContext(ProfileUserIdContext)

    // fetch all posts
    const postIds = useSelector(selectPostIds)
    const hasMorePosts = useSelector(selectActivityFeedHasMorePosts)
    const isLoading = useSelector(selectPostLoading)

    useEffect(() => {
        dispatch(fetchPosts(profileUserId))

        return () => {
            dispatch(cleanFeedState())
        }
    }, [profileUserId, dispatch])

    useEffect(() => {
        const handleScroll = () => {
            if (!isLoading && hasMorePosts === true &&
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                dispatch(fetchPosts(profileUserId))
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isLoading, hasMorePosts, profileUserId, dispatch])

    return (
        <Box
            className="c-feed"
            sx={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}
        >
            <ActivityFeedHeader />

            {!profileUserId &&
                <PostForm />
            }

            {postIds.map(postId => (
                <Grid key={postId}>
                    <PostIdProvider postId={postId}>
                        <Post />
                    </PostIdProvider>
                </Grid>
            ))}

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                {isLoading
                    ? <CircularProgress />
                    : hasMorePosts === false &&
                        <ActivityFeedPlaceholder />
                }
            </Box>

        </Box>
    )
}

import { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, CircularProgress } from '@mui/material'
import { PostIdProvider } from '../../contexts/PostIdProvider'
import { getPosts, getHasMorePosts, getPostLoading } from '../../../../../redux/selectors/feed'
import { fetchPosts } from '../../../../../redux/thunks/feed'
import { cleanFeedState } from '../../../../../redux/reducers/feed'
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
    const posts = useSelector(getPosts)
    const hasMorePosts = useSelector(getHasMorePosts)
    const isLoading = useSelector(getPostLoading)

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

            {posts.map(post => (
                <Grid key={post.id}>
                    <PostIdProvider postId={post.id}>
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

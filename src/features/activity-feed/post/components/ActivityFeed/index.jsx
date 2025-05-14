import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Grid, CircularProgress } from '@mui/material'
import { getPosts, getHasMorePosts, getPostLoading } from '../../../../../redux/selectors/feed'
import { fetchPosts } from '../../../../../redux/thunks/feed'
import { cleanFeedState } from '../../../../../redux/reducers/feed'
import { ActivityFeedHeader } from '../ActivityFeedHeader'
import { PostForm } from '../PostForm'
import { Post } from '../Post'
import { ActivityFeedPlaceholder } from '../ActivityFeedPlaceholder'

import './style.scss'

ActivityFeed.propTypes = {
    userIdUrl: PropTypes.number
}

export function ActivityFeed({ userIdUrl }) {
    const dispatch = useDispatch()

    // fetch all posts
    const posts = useSelector(getPosts)
    const hasMorePosts = useSelector(getHasMorePosts)
    const isLoading = useSelector(getPostLoading)

    useEffect(() => {
        dispatch(fetchPosts(userIdUrl))

        return () => {
            dispatch(cleanFeedState())
        }
    }, [userIdUrl, dispatch])

    useEffect(() => {
        const handleScroll = () => {
            if (!isLoading && hasMorePosts === true &&
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 100
            ) {
                dispatch(fetchPosts(userIdUrl))
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [isLoading, hasMorePosts, userIdUrl, dispatch])

    return (
        <Box
            className="c-feed"
            sx={{ paddingTop: '1.5em', paddingBottom: '1.5em' }}
        >
            <ActivityFeedHeader />

            {!userIdUrl &&
                <PostForm />
            }

            {posts.map(post => (
                <Grid key={post.id}>
                    <Post {...post} />
                </Grid>
            ))}

            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                {isLoading
                    ? <CircularProgress />
                    : hasMorePosts === false &&
                        <ActivityFeedPlaceholder userId={userIdUrl} />
                }
            </Box>

        </Box>
    )
}

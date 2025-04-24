import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Box, Typography, Avatar, Grid, CircularProgress } from '@mui/material'
import { getUser, getUserOrganizationName } from '../../../../user/store/userSelectors'
import { getPosts, getHasMorePosts, getPostLoading } from '../../../../../redux/selectors/feed'
import { fetchPosts } from '../../../../../redux/thunks/feed'
import { cleanFeedState } from '../../../../../redux/reducers/feed'
import { SelectedUserCard } from '../SelectedUserCard'
import { PostForm } from '../PostForm'
import { Post } from '../Post'
import { ActivityFeedPlaceholder } from '../ActivityFeedPlaceholder'

import './style.scss'

ActivityFeed.propTypes = {
    userIdUrl: PropTypes.number
}

export function ActivityFeed({ userIdUrl }) {
    // Fetch of logged-in user data
    const dispatch = useDispatch()
    const userLogged = useSelector(getUser)

    const organizationName = useSelector(getUserOrganizationName)

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

            <Box className="c-feed-header" id="back-to-top-anchor">
                {userIdUrl
                    ? <SelectedUserCard />
                    : <>
                        <Typography variant="h5">
                            {organizationName}
                        </Typography>

                        <Box
                            className="c-feed-header__textarea"
                            sx={{ marginBottom: '1em', marginLeft: { xs: 1, md: 0 } }}
                        >
                            <Avatar
                                className="c-avatar"
                                alt="Remy Sharp"
                                src={userLogged.profilePicture}
                            />
                            <PostForm
                            />
                        </Box>
                    </>
                }
            </Box>

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

import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Grid, List } from '@mui/material'
import { Comment } from '../Comment'
import { getPostComments } from '../../../../../redux/selectors/feed'
import { fetchComments } from '../../../../../redux/thunks/feed'

CommentsList.propTypes = {
    postId: PropTypes.number.isRequired,
    isDisplayed: PropTypes.bool.isRequired,
    onError: PropTypes.func
}

export function CommentsList({ postId, isDisplayed, onError }) {
    const comments = useSelector(getPostComments(postId))
    const [isLoadingComments, setIsLoadingComments] = useState(false)

    const dispatch = useDispatch()

    const loadComments = useCallback(async function () {
        if (comments) return

        setIsLoadingComments(true)

        try {
            await dispatch(fetchComments(postId)).unwrap()
        } catch (error) {
            if (typeof onError === 'function') onError(error)
            console.error(error) // TODO: instead of console logs, errors must be displayed directly to user
        } finally {
            setIsLoadingComments(false)
        }
    }, [postId, comments, onError, dispatch])

    useEffect(() => {
        if (isDisplayed) {
            loadComments()
        }
    }, [isDisplayed, loadComments])

    return (
        <>
            {isLoadingComments &&
                <Box className="c-card-post__loader">
                    <CircularProgress />
                </Box>
            }
            <List>
                {comments?.map(comment => (
                    <Grid key={comment.id}>
                        <Comment {...comment} />
                    </Grid>
                ))}
            </List>
        </>
    )
}

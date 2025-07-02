import PropTypes from 'prop-types'
import { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, CircularProgress, Grid, List } from '@mui/material'
import { Comment } from '../Comment'
import { selectPostComments } from '../../store/commentsSelectors'
import { fetchComments } from '../../../../../redux/thunks/feed'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'

CommentsList.propTypes = {
    isDisplayed: PropTypes.bool.isRequired,
    onError: PropTypes.func
}

export function CommentsList({ isDisplayed, onError }) {
    const postId = useContext(PostIdContext)
    const comments = useSelector(state => selectPostComments(state, postId))
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

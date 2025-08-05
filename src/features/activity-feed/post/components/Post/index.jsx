import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Card, CardActions, CardHeader, CardContent, CircularProgress, Grid, Typography, Button, Divider, Avatar, Collapse, List, Box, Link as MuiLink } from '@mui/material'
import { styled } from '@mui/material/styles'
import { HashLink } from 'react-router-hash-link'
import pluralize from 'pluralize'
import { getPostComments, getPostReactions } from '../../../../../redux/selectors/feed'
import { fetchComments } from '../../../../../redux/thunks/feed'
import { getUser } from '../../../../user/store/userSelectors'
import { CommentForm } from '../../../comment/components/CommentForm'
import { Comment } from '../../../comment/components/Comment'
import { ReactionButton } from '../../../../../components/Buttons/ReactionButton'
import { PostReactionsCounter } from '../../../../../components/PostReactionsCounter'

import './style.scss'

const ExpandMore = styled(props => {
    return <Button {...props} />
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
    })
}))

Post.propTypes = {
    id: PropTypes.number,
    author: PropTypes.object,
    text: PropTypes.string,
    createdAt: PropTypes.string,
    commentsCount: PropTypes.number
}

export function Post({ id, author, text, commentsCount, createdAt }) {
    // Date and time reformatting
    const date = moment(createdAt).format('DD/MM/YYYY')
    const time = moment(createdAt).format('HH[h]mm')

    // fetch of logged-in user data
    const userLogged = useSelector(getUser)

    // expanding list of post comments
    const [expanded, setExpanded] = useState(false)

    const dispatch = useDispatch()

    // fetch all comments by post
    const comments = useSelector(getPostComments(id))
    const [isLoadingComments, setIsLoadingComments] = useState(false)

    const reactions = useSelector(getPostReactions(id))

    const handleExpandClick = async () => {
        setExpanded(!expanded)

        if (!comments) {
            setIsLoadingComments(true)

            try {
                await dispatch(fetchComments(id)).unwrap()
            } catch (error) {
                setExpanded(false)
                console.error(error) // TODO: instead of console logs, errors must be displayed directly to user
            } finally {
                setIsLoadingComments(false)
            }
        }
    }

    return (
        <Card
            sx={{ borderRadius: { xs: 0, md: 3 } }}
            className="c-card-post"
        >
            <CardHeader
                avatar={
                    <Link to={`/${userLogged.organization.id}/user/${author.id}`}>
                        <Avatar className="c-avatar" alt="Remy Sharp" src={author.profilePicture} />
                    </Link>
                }
                title={
                    <>
                        <MuiLink
                            component={Link}
                            to={`/${userLogged.organization.id}/user/${author.id}`}
                        >
                            <Typography
                                className="c-card-post__identity"
                                variant="body1"
                            >
                                {`${author.name} ${author.surname}`}
                            </Typography>
                        </MuiLink>
                        <Typography
                            className="c-card-post__separator"
                            variant="body2"
                        >
                            {' - '}
                        </Typography>
                        <Typography
                            className="c-card-post__date"
                            variant="body2"
                        >
                            {date} à {time}
                        </Typography>
                    </>
                }
                subheader={author.job}
            />
            <Divider />
            <CardContent>
                <Typography className="c-card-post__text" variant="body1">
                    {text}
                </Typography>
            </CardContent>

            {(reactions.length > 0 || commentsCount > 0) &&
                <>
                    <Divider />
                    <CardContent className="c-counter">
                        {reactions.length > 0 &&
                            <PostReactionsCounter postId={id} />
                        }
                        {commentsCount > 0 &&
                            <ExpandMore
                                expand={expanded}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                                className="c-counter__btn"
                            >
                                {pluralize(`commentaire`, commentsCount, true)}
                            </ExpandMore>
                        }
                    </CardContent>
                </>
            }

            <Divider />
            <CardActions className="c-card-post__action" disableSpacing>
                <ReactionButton
                    postId={id}
                />
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className="c-btn footer"
                    variant="outlined"
                    component={expanded ? 'span' : HashLink}
                    smooth="true" // Enable smooth scrolling
                    to={expanded ? null : `#${id}-comment-form-anchor`}
                >
                Commenter
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ padding: '0 16px' }} className="c-card-post__list">
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
                    <Box className="c-feed-header">
                        <Box className="c-feed-header__textarea">
                            <Avatar className="c-avatar" alt="Remy Sharp" src={userLogged.profilePicture} />
                            <CommentForm postId={id} />
                        </Box>
                    </Box>
                </CardContent>
            </Collapse>
        </Card>
    )
}

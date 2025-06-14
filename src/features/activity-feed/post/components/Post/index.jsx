import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Card, CardActions, CardHeader, CardContent, Typography, Button, Divider, Avatar, Collapse, Link as MuiLink } from '@mui/material'
import { HashLink } from 'react-router-hash-link'
import { getPostReactions } from '../../../../../redux/selectors/feed'
import { getUser } from '../../../../user/store/userSelectors'
import { CommentsList } from '../../../comment/components/CommentsList'
import { CommentForm } from '../../../comment/components/CommentForm'
import { ReactionButton } from '../../../reaction/components/ReactionButton'
import { ReactionsCounter } from '../../../reaction/components/ReactionsCounter'
import { CommentsCounter } from '../../../comment/components/CommentsCounter'

import './style.scss'

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

    const reactions = useSelector(getPostReactions(id))

    const handleExpandClick = async () => {
        setExpanded(!expanded)
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
                            <ReactionsCounter postId={id} />
                        }
                        {commentsCount > 0 &&
                            <CommentsCounter
                                commentsCount={commentsCount}
                                expanded={expanded}
                                onClick={handleExpandClick}
                            />
                        }
                    </CardContent>
                </>
            }

            <Divider />
            <CardActions className="c-card-post__action" sx={{ justifyContent: 'space-between' }}>
                <ReactionButton
                    postId={id}
                />
                <Button
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
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ padding: '0 16px' }} className="c-card-post__list">
                    <CommentsList
                        postId={id}
                        isDisplayed={expanded}
                        onError={() => setExpanded(false)}
                    />
                    <CommentForm postId={id} />
                </CardContent>
            </Collapse>
        </Card>
    )
}

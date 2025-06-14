import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { Card, CardActions, CardHeader, CardContent, Typography, Button, Divider, Avatar, Collapse, Link as MuiLink } from '@mui/material'
import { HashLink } from 'react-router-hash-link'
import { PostIdContext } from '../../contexts/PostIdProvider'
import { getPost, getPostReactions } from '../../../../../redux/selectors/feed'
import { getUser } from '../../../../user/store/userSelectors'
import { CommentsList } from '../../../comment/components/CommentsList'
import { CommentForm } from '../../../comment/components/CommentForm'
import { ReactionButton } from '../../../reaction/components/ReactionButton'
import { ReactionsCounter } from '../../../reaction/components/ReactionsCounter'
import { CommentsCounter } from '../../../comment/components/CommentsCounter'

import './style.scss'

export function Post() {
    const post = useSelector(getPost(useContext(PostIdContext)))

    // Date and time reformatting
    const date = moment(post.createdAt).format('DD/MM/YYYY')
    const time = moment(post.createdAt).format('HH[h]mm')

    // fetch of logged-in user data
    const userLogged = useSelector(getUser)

    // expanding list of post comments
    const [expanded, setExpanded] = useState(false)

    const reactions = useSelector(getPostReactions(post.id))

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
                    <Link to={`/${userLogged.organization.id}/user/${post.author.id}`}>
                        <Avatar className="c-avatar" alt="Remy Sharp" src={post.author.profilePicture} />
                    </Link>
                }
                title={
                    <>
                        <MuiLink
                            component={Link}
                            to={`/${userLogged.organization.id}/user/${post.author.id}`}
                        >
                            <Typography
                                className="c-card-post__identity"
                                variant="body1"
                            >
                                {`${post.author.name} ${post.author.surname}`}
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
                subheader={post.author.job}
            />
            <Divider />
            <CardContent>
                <Typography className="c-card-post__text" variant="body1">
                    {post.text}
                </Typography>
            </CardContent>

            {(reactions.length > 0 || post.commentsCount > 0) &&
                <>
                    <Divider />
                    <CardContent className="c-counter">
                        {reactions.length > 0 &&
                            <ReactionsCounter />
                        }
                        {post.commentsCount > 0 &&
                            <CommentsCounter
                                expanded={expanded}
                                onClick={handleExpandClick}
                            />
                        }
                    </CardContent>
                </>
            }

            <Divider />
            <CardActions className="c-card-post__action" sx={{ justifyContent: 'space-between' }}>
                <ReactionButton />
                <Button
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    className="c-btn footer"
                    variant="outlined"
                    component={expanded ? 'span' : HashLink}
                    smooth="true" // Enable smooth scrolling
                    to={expanded ? null : `#${post.id}-comment-form-anchor`}
                >
                    Commenter
                </Button>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ padding: '0 16px' }} className="c-card-post__list">
                    <CommentsList
                        isDisplayed={expanded}
                        onError={() => setExpanded(false)}
                    />
                    <CommentForm />
                </CardContent>
            </Collapse>
        </Card>
    )
}

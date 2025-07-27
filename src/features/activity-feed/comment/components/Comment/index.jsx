import PropTypes from 'prop-types'
import moment from 'moment'
import { ListItem, ListItemAvatar, Paper, Avatar, Typography, Link as MuiLink } from '@mui/material'
import './style.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectComment } from '../../store/commentsSelectors'

Comment.propTypes = {
    id: PropTypes.number.isRequired
}

export function Comment({ id }) {
    const comment = useSelector(state => selectComment(state, id))

    // Date and time reformatting
    const date = moment(comment.createdAt).format('DD/MM/YYYY')
    const time = moment(comment.createdAt).format('HH[h]mm')

    return (
        <ListItem className="c-comment-list" alignItems="flex-start">
            <ListItemAvatar>
                <Link to={`/${comment.author.organization.id}/user/${comment.author.id}`}>
                    <Avatar alt="Remy Sharp" src={comment.author.profilePicture} />
                </Link>
            </ListItemAvatar>
            <Paper className="c-comment-list__paper">
                <MuiLink
                    component={Link}
                    to={`/${comment.author.organization.id}/user/${comment.author.id}`}
                >
                    <Typography
                        className="c-comment-list__identity"
                        variant="body1"
                    >
                        {`${comment.author.name} ${comment.author.surname}`}
                    </Typography>
                </MuiLink>
                <Typography
                    className="c-comment-list__separator"
                    variant="body2"
                >
                    {' - '}
                </Typography>
                <Typography
                    className="c-comment-list__date"
                    variant="body2"
                >
                    {date} à {time}
                </Typography>
                <Typography className="c-comment-list__job" variant="body2">
                    {comment.author.job}
                </Typography>
                <Typography className="c-comment-list__text" variant="body1" mt={2}>
                    {comment.text}
                </Typography>
            </Paper>
        </ListItem>
    )
}

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Avatar, Badge, Box, styled, Link as MuiLink, Typography } from '@mui/material'
import { getUserOrganizationId } from '../../../../user/store/userSelectors'

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 20,
    height: 20,
    background: `${theme.palette.background.paper}`,
    padding: 2
}))

ReactionsListItem.propTypes = {
    reaction: PropTypes.shape({
        id: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        author: PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            surname: PropTypes.string.isRequired,
            job: PropTypes.string.isRequired,
            profilePicture: PropTypes.string
        }).isRequired,
        postId: PropTypes.number.isRequired
    }).isRequired
}

export function ReactionsListItem({ reaction }) {
    const organizationId = useSelector(getUserOrganizationId)

    return (
        <Box
            className="c-reaction-post__info-emoji"
            sx={{ display: 'flex', alignItems: 'center', padding: '0', margin: 1 }}>
            <Badge
                className="c-reaction-post__info-container-picture"
                sx={{ marginRight: '0.5em' }}
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                    <SmallAvatar src={`/assets/reactions/emoji-${reaction.type}.png`} />
                }
            >
                <Avatar
                    component={Link}
                    to={`/${organizationId}/user/${reaction.author.id}`}
                    alt={reaction.author.name}
                    src={reaction.author.profilePicture}
                />
            </Badge>
            <Box>
                <MuiLink
                    component={Link}
                    to={`/${organizationId}/user/${reaction.author.id}`}
                >
                    <Typography
                        variant="body2"
                        className="c-reaction-post__identity"
                    >
                        {`${reaction.author.name} ${reaction.author.surname}`}
                    </Typography>
                </MuiLink>
                <Typography
                    variant="body2"
                    className="c-reaction-post__job"
                >
                    {reaction.author.job}
                </Typography>
            </Box>
        </Box>
    )
}

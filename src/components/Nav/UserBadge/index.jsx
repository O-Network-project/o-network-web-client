import { Avatar, Box, Typography, Link as MuiLink } from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectUser } from '../../../features/user/store/userSelectors'

import './style.scss'

export function UserBadge() {
    const userLogged = useSelector(selectUser)

    return (
        <MuiLink
            component={Link}
            to={`/${userLogged.organization.id}/user/${userLogged.id}`}
        >
            <Box
                className="c-user-badge__group"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '180px',
                    margin: 'auto',
                    padding: '0.5em'
                }}
            >
                <Avatar
                    className="c-user-badge__avatar"
                    src={userLogged.profilePicture}
                    alt={userLogged.name + userLogged.surname}
                    sx={{
                        width: '100px',
                        height: '100px',
                        my: 1
                    }}
                />
                <Box
                    className="c-user-badge__info"
                    sx={{
                        textAlign: 'center',
                        pb: 1
                    }}
                >
                    <Typography
                        className="c-user-badge__identity"
                        variant="body1"
                    >
                        {userLogged.name}
                    </Typography>
                    <Typography
                        className="c-user-badge__identity"
                        variant="body1"
                    >
                        {userLogged.surname}
                    </Typography>
                    <Typography
                        className="c-user-badge__job"
                        variant="body1"
                    >
                        {userLogged.job}
                    </Typography>
                </Box>
            </Box>
        </MuiLink>
    )
}

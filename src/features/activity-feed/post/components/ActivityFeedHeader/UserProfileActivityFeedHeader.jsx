import { Box, Typography, Link as MuiLink, Avatar } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../../../../services/api'
import { ProfileUserIdContext } from '../../contexts/ProfileUserIdProvider'

export function UserProfileActivityFeedHeader() {
    const profileUserId = useContext(ProfileUserIdContext)
    const [selectedMember, setSelectedMember] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const res = await api(`/users/${profileUserId}`)
                setSelectedMember(res.data)
            } catch {
                console.log(`membre introuvable`)
            } finally {
                setIsLoading(false)
            }
        }

        fetchUser()
    }, [profileUserId])

    if (isLoading) {
        return ''
    }

    if (profileUserId && !selectedMember) {
        return (
            <Box>
                <Typography variant="body1">Utilisateur non trouvé.</Typography>
            </Box>
        )
    }

    return (
        <Box
            className="c-user-badge__group"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto',
                maxWidth: '300px',
                padding: '0.5em'
            }}
        >
            <MuiLink
                component={Link}
                to={`/${selectedMember.organization.id}/user/${selectedMember.id}`}
            >
                <Avatar
                    className="c-user-badge__avatar"
                    src={selectedMember.profilePicture}
                    alt={selectedMember.name + selectedMember.surname}
                    sx={{
                        width: '100px',
                        height: '100px',
                        my: 1,
                        mx: 'auto'
                    }}
                />
                <Box
                    className="c-user-badge__info"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        pb: 1
                    }}
                >
                    <Typography
                        className="c-user-badge__identity"
                        variant="body1"
                    >
                        {selectedMember.name} {selectedMember.surname}
                    </Typography>
                    <Typography
                        className="c-user-badge__job"
                        variant="body1"
                    >
                        {selectedMember.job}
                    </Typography>
                </Box>
            </MuiLink>
        </Box>
    )
}

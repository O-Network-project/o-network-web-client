import { useParams, Link } from 'react-router-dom'
import { Avatar, Box, Typography, Link as MuiLink } from '@mui/material'
import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'

import './style.scss'

export function SelectedUserCard() {
    const userId = parseInt(useParams().userId, 10)
    const [selectedMember, setSelectedMember] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setIsLoading(true)
                const res = await api(`/users/${userId}`)
                setSelectedMember(res.data)
                setIsLoading(false)
            } catch {
                console.log(`membre introuvable`)
            }
        }

        fetchUser()
    }, [userId])

    if (isLoading) {
        return ''
    }

    if (!selectedMember) {
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

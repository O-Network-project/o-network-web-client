import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import { HashLink } from 'react-router-hash-link'
import { BasicButton } from '../../Buttons/BasicButton'
import { selectUserIsLogged, selectUserId, selectUserOrganizationId } from '../../../features/user/store/userSelectors'
import { selectErrorPageCode } from '../../../store/errorPageSelectors'
import { ErrorCode } from '../../../store/errorPageSlice'

import './style.scss'

export function ButtonHome() {
    const location = useLocation()
    const isLog = useSelector(selectUserIsLogged)
    const errorCode = useSelector(selectErrorPageCode)
    const currentPath = location.pathname
    const organizationId = useSelector(selectUserOrganizationId)
    const userId = useSelector(selectUserId)

    return (
        <Box className="c-button-header" sx={{ flexGrow: 1 }}>
            {/* pour le bouton retour au flux d'activité si on est connecté sur desktop */}
            {isLog &&
                (currentPath === '/about' ||
                currentPath === `/${organizationId}/user/${userId}/edit` ||
                [ErrorCode.FORBIDDEN, ErrorCode.NOT_FOUND, ErrorCode.INTERNAL_SERVER_ERROR].includes(errorCode)) && (
                <BasicButton
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    className="c-button-header_btn"
                    variant="outlined"
                    name="Retour au flux d'activité"
                    component={Link}
                    route={isLog ? `/${organizationId}` : '/'}
                />
            )}

            {/* pour le bouton deja un compte sur mobile */}
            {currentPath === '/' && (
                <BasicButton
                    sx={{ display: { sm: 'block', md: 'none' } }}
                    className="c-button-header_btn"
                    variant="outlined"
                    name="Déjà un compte ?"
                    component={HashLink}
                    route="#connexion"
                />
            )}

            {/* pour le bouton retour a l'acceuil si l'utilisateur n'est pas connecté */}
            {!isLog &&
                (currentPath === '/sign-up' ||
                currentPath === '/new-organization' ||
                currentPath === '/about' ||
                [ErrorCode.UNAUTHORIZED, ErrorCode.NOT_FOUND, ErrorCode.INTERNAL_SERVER_ERROR].includes(errorCode)) && (
                <Button
                    className="c-button-header_btn"
                    variant="outlined"
                    component={Link}
                    to="/"
                >
                    {'Retour à l\'accueil'}
                </Button>
            )}
        </Box>
    )
}

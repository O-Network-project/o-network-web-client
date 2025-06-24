import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Typography } from '@mui/material'
import { selectUserIsLogged } from '../../store/userSelectors'

ProfileFormTitle.propTypes = {
    invitation: PropTypes.object
}

export function ProfileFormTitle({ invitation }) {
    const isLog = useSelector(selectUserIsLogged)
    let title

    if (isLog) {
        title = `Votre profil`
    } else if (invitation) {
        title = <>
            Rejoignez <Typography
                component="strong"
                variant="inherit"
                fontStyle="italic"
                fontWeight="fontWeightMedium"
            >
                {invitation.organization.name}
            </Typography> sur O'Network
        </>
    } else {
        title = `Créez votre profil`
    }

    return (
        <Typography
            className="c-profile-form__title"
            component="h1"
            variant="h4"
            sx={{
                maxWidth: '600px',
                my: 5,
                px: 3
            }}
        >
            {title}
        </Typography>
    )
}

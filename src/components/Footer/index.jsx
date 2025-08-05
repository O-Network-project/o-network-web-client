import { Link } from 'react-router-dom'
import { Typography, Box } from '@mui/material'
import { BasicButton } from '../BasicButton'
import './style.scss'

export function Footer() {
    return (
        <Box component="footer" className="c-footer">
            <Typography className="c-footer__text" variant="subtitle2">
                Projet de fin de formation O'clock socle PHP spé REACT
            </Typography>
            <Box className="c-footerBtn">
                <BasicButton
                    className="c-btn footer"
                    variant="outlined"
                    name="Contact"
                    component={Link} route="/about" />
            </Box>
        </Box>
    )
}

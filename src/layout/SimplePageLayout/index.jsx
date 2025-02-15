import PropTypes from 'prop-types'
import { Grid, Box } from '@mui/material'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import './style.scss'

function SimplePageLayout({ children }) {
    return (
        <Grid>
            <Box className="c-simple-page">
                <Header />
                <Box className="c-simple-page__main">
                    {children}
                </Box>
                <Footer />
            </Box>
        </Grid>
    )
}

SimplePageLayout.propTypes = {
    children: PropTypes.node
}

export { SimplePageLayout }

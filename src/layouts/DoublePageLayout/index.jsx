import PropTypes from 'prop-types'
import { Grid, Box } from '@mui/material'
import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import './style.scss'

DoublePageLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export function DoublePageLayout({ children }) {
    return (
        <Grid container>
            <Grid item md={6} lg={6} sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Box className="c-double-img">
                    <img
                        className="c-double-img__left"
                        src="/assets/austin-distel-wD1LRb9OeEo-unsplash.jpg" alt="tranquillou les devs!"></img>
                </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
                <Box className="c-double-main">
                    <Header
                        className="c-header__double-page" />
                    {children}
                </Box>
            </Grid>
            <Grid item xs={12} md={12}>
                <Footer />
            </Grid>
        </Grid>
    )
}

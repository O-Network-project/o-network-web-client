import PropTypes from 'prop-types'
import { Toolbar, Box, Drawer, List } from '@mui/material'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import { DesktopMenu } from '../../components/Nav/DesktopMenu'
import { UserCard } from '../../components/Cards/UserCard'

import './style.scss'

const drawerWidth = 240

export function AuthenticatedLayout({ children }) {
    return (

        <Box>
            <Header className="c-header__authenticated" />
            <Box
                component="main"
                className="c-main__authenticated"
            >
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block', md: 'block' },
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            <Box className="c-box-avatar">
                                <UserCard />
                            </Box>
                            <DesktopMenu />
                        </List>
                    </Box>
                </Drawer>

                <Box className="c-box-children">
                    {children}
                </Box>
            </Box>
            <Footer />
        </Box>
    )
}

AuthenticatedLayout.propTypes = {
    children: PropTypes.node
}

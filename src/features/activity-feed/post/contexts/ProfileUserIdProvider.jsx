import PropTypes from 'prop-types'
import { createContext } from 'react'
import { useParams } from 'react-router-dom'

export const ProfileUserIdContext = createContext(null)

ProfileUserIdProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export function ProfileUserIdProvider({ children }) {
    const profileUserId = parseInt(useParams().userId, 10)

    return (
        <ProfileUserIdContext.Provider value={profileUserId}>
            {children}
        </ProfileUserIdContext.Provider>
    )
}

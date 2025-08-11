import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const MembersListContext = createContext(null)

MembersListProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export function MembersListProvider({ children }) {
    const [members, setMembers] = useState([])

    const setMember = member => {
        setMembers(members.map(m => m.id === member.id ? member : m))
    }

    return (
        <MembersListContext.Provider value={{ members, setMembers, setMember }}>
            {children}
        </MembersListContext.Provider>
    )
}

import PropTypes from 'prop-types'
import { createContext } from 'react'

export const PostIdContext = createContext(null)

PostIdProvider.propTypes = {
    postId: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
}

export function PostIdProvider({ postId, children }) {
    return (
        <PostIdContext.Provider value={postId}>
            {children}
        </PostIdContext.Provider>
    )
}

import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserIsAdmin } from '../../features/user/store/userSelectors'
import { ErrorCode, setErrorPage } from '../../redux/errorPageSlice'
import { ConditionalRoute } from '.'

AdminRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node
}

export function AdminRoute({ redirectTo, children }) {
    const dispatch = useDispatch()
    const isAdmin = useSelector(selectUserIsAdmin)

    return (
        <ConditionalRoute
            condition={isAdmin}
            redirectTo={redirectTo}
            onError={() => dispatch(setErrorPage(ErrorCode.FORBIDDEN))}
        >
            {children}
        </ConditionalRoute>
    )
}

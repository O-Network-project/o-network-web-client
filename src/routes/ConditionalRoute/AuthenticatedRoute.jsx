import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserIsLogged } from '../../features/user/store/userSelectors'
import { ErrorCode, setErrorPage } from '../../store/errorPageSlice'
import { ConditionalRoute } from '.'

AuthenticatedRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node
}

export function AuthenticatedRoute({ redirectTo, children }) {
    const dispatch = useDispatch()
    const isLog = useSelector(selectUserIsLogged)

    return (
        <ConditionalRoute
            condition={isLog}
            redirectTo={redirectTo}
            onError={() => dispatch(setErrorPage(ErrorCode.UNAUTHORIZED))}
        >
            {children}
        </ConditionalRoute>
    )
}

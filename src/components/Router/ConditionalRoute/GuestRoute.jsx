import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getIsLogged } from '../../../redux/selectors/user'
import { ErrorCode, setErrorPage } from '../../../redux/reducers/errorPage'
import { ConditionalRoute } from '.'

GuestRoute.propTypes = {
    redirectTo: PropTypes.string,
    children: PropTypes.node
}

export function GuestRoute({ redirectTo, children }) {
    const dispatch = useDispatch()
    const isLog = useSelector(getIsLogged)

    return (
        <ConditionalRoute
            condition={!isLog}
            redirectTo={redirectTo}
            onError={() => dispatch(setErrorPage(ErrorCode.FORBIDDEN))}
        >
            {children}
        </ConditionalRoute>
    )
}

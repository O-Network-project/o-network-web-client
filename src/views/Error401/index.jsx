import PropTypes from 'prop-types'
import { Error } from '../../layout/Error'

Error401.propTypes = {
    message: PropTypes.string
}

export function Error401({ message = `Accès refusé : Vous devez être connecté pour accéder à cette page.` }) {
    return (
        <Error
            code={401}
            message={message}
            image="/assets/errors/closedoor401.jpg"
        />
    )
}

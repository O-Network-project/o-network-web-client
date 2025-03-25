import PropTypes from 'prop-types'
import { Error } from '../../layouts/Error'

Error403.propTypes = {
    message: PropTypes.string
}

export function Error403({ message = `Désolé, vous n'avez pas l'autorisation d'accéder à cette page.` }) {
    return (
        <Error
            code={403}
            message={message}
            image="/assets/errors/interdit403.jpg"
        />
    )
}

import PropTypes from 'prop-types'
import { Error } from '../../layouts/Error'

Error500.propTypes = {
    message: PropTypes.string
}

export function Error500({ message = `Oups ! Quelque chose s'est mal passé de notre côté. Veuillez réessayer plus tard.` }) {
    return (
        <Error
            code={500}
            message={message}
            image="/assets/errors/cable500.jpg"
        />
    )
}

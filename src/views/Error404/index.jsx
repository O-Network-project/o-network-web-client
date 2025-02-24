import PropTypes from 'prop-types'
import { Error } from '../../layout/Error'

Error404.propTypes = {
    message: PropTypes.string
}

export function Error404({ message = `La page que vous recherchez est perdue dans l'espace.` }) {
    return (
        <Error
            code={404}
            message={message}
            image="/assets/errors/espace404.jpg"
        />
    )
}

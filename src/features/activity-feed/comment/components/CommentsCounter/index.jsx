import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import pluralize from 'pluralize'

CommentsCounter.propTypes = {
    commentsCount: PropTypes.number.isRequired,
    expanded: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
}

export function CommentsCounter({ commentsCount, expanded, onClick }) {
    return (
        <Button
            sx={{ marginLeft: 'auto' }}
            onClick={onClick}
            aria-expanded={expanded}
            aria-label="show more"
            className="c-counter__btn"
        >
            {pluralize(`commentaire`, commentsCount, true)}
        </Button>
    )
}

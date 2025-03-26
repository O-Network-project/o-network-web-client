import { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useSelector } from 'react-redux'
import { getUser } from '../../store/userSelectors'

import './style.scss'

AvatarFormInput.propTypes = {
    control: PropTypes.object.isRequired,
    resetField: PropTypes.func.isRequired,
    onDeletePictureChange: PropTypes.func.isRequired
}

export function AvatarFormInput({ control, resetField, onDeletePictureChange }) {
    const user = (useSelector(getUser))
    const currentProfilePicture = user.profilePicture

    const inputRef = useRef(null)
    const [preview, setPreview] = useState(currentProfilePicture)

    const [deleteUserPicture, setDeleteUserPicture] = useState(false)

    const onUpdate = file => {
        const urlImage = URL.createObjectURL(file)
        setPreview(urlImage)
        setDeleteUserPicture(false)
        onDeletePictureChange(false)
    }

    const onBrowse = () => {
        inputRef.current.click()
    }

    const onRemove = () => {
        setPreview(null)
        resetField('profilePicture')
        inputRef.current.value = null
        setDeleteUserPicture(true)
        onDeletePictureChange(true)
    }

    const uploadButtonLabel = preview ? `Changer l'image` : `Choisir un fichier`

    return (
        <Box className="c-avatar-form"
            sx={{
                maxWidth: '400px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                pb: 2
            }}
        >
            <Controller
                name="profilePicture"
                control={control}
                render={({ field }) => (
                    <input
                        className="c-avatar-form__input"
                        type="file"
                        onChange={e => {
                            field.onChange(e.target.files[0])
                            onUpdate(e.target.files[0])
                        }}
                        ref={e => {
                            field.ref(e)
                            inputRef.current = e
                        }}
                    />
                )}
            />

            <Avatar
                className="c-avatar-form__avatar"
                src={preview}
                sx={{
                    width: 80,
                    height: 80
                }}
            />

            <Button
                className="c-avatar-form__button"
                variant="outlined"
                onClick={onBrowse}
            >
                {uploadButtonLabel}
            </Button>
            {deleteUserPicture === true && (
                <Button
                    className="c-avatar-form__button"
                    variant="outlined"
                    onClick={onRemove}
                    disabled
                >
                X
                </Button>
            )}
            {deleteUserPicture === false && (
                <Button
                    className="c-avatar-form__button"
                    variant="outlined"
                    onClick={onRemove}
                >
                X
                </Button>
            )}
        </Box>
    )
}

import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { InputBase, Paper, IconButton, Box, Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { createPost } from '../../../../../redux/thunks/feed'
import { selectUser } from '../../../../user/store/userSelectors'
import './style.scss'

export function PostForm() {
    const userLogged = useSelector(selectUser)

    const { register, handleSubmit, reset } = useForm()
    const dispatch = useDispatch()

    const onSubmit = ({ text }) => {
        dispatch(createPost(text))
        reset()
    }

    return (
        <Box
            className="c-feed-header__textarea"
            sx={{ marginBottom: '1em', marginLeft: { xs: 1, md: 0 } }}
        >
            <Avatar
                className="c-avatar"
                alt="Remy Sharp"
                src={userLogged.profilePicture}
            />
            <Paper
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', marginLeft: '1em' }}
                className="c-feed-header__form"
                component="form"
                onSubmit={ handleSubmit(onSubmit)}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Nouveau Post..."
                    multiline
                    type="text"
                    {...register('text', { required: 'Veuillez saisir un texte!' })}

                />
                <IconButton
                    sx={{ p: '10px' }}
                    type="submit"
                >
                    <SendIcon />
                </IconButton>
            </Paper>
        </Box>
    )
}

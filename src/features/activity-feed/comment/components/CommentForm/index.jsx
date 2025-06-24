import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Paper, InputBase, IconButton, Box, Avatar } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { PostIdContext } from '../../../post/contexts/PostIdProvider'
import { createComment } from '../../../../../redux/thunks/feed'
import { selectUser } from '../../../../user/store/userSelectors'
import './style.scss'

export function CommentForm() {
    const postId = useContext(PostIdContext)
    const user = useSelector(selectUser)
    const { register, handleSubmit, reset } = useForm()

    const dispatch = useDispatch()

    const onSubmit = ({ text }) => {
        dispatch(createComment({ text, postId }))
        reset()
    }

    return (
        <Box className="c-feed-header">
            <Box className="c-feed-header__textarea">
                <Avatar className="c-avatar" alt="Remy Sharp" src={user.profilePicture} />
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, marginLeft: '1em' }}
                    className="c-feed-header__form"
                    component="form"
                    onSubmit={ handleSubmit(onSubmit)}
                >
                    <InputBase id={`${postId}-comment-form-anchor`}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Commenter..."
                        multiline
                        type="text"
                        {...register('text', { required: 'Veuillez saisir un texte!' })}

                    />
                    <IconButton
                        type="submit"
                        sx={{ p: '10px' }}>
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Box>
        </Box>
    )
}

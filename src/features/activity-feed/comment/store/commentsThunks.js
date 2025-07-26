import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from '../../../../services/api'

export const fetchComments = createAsyncThunk('comments/fetchComments', async (postId, thunkApi) => {
    try {
        const { data: comments } = await api.get(`/posts/${postId}/comments`)
        return comments
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Ce post n'existe pas` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la récupération des commentaires.` })
    }
})

export const createComment = createAsyncThunk('comments/createComment', async ({ text, postId }, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data: comment } = await api.post(`/posts/${postId}/comments`, { text })

        return comment
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Ce post n'existe pas` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la création du commentaire.` })
    }
})

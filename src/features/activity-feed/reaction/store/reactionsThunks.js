import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from '../../../../services/api'

export const createReaction = createAsyncThunk('feed/createReaction', async ({ postId, type }, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data: reaction } = await api.post(`/posts/${postId}/reactions`, { type })

        return reaction
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Ce post n'existe pas` })
        }
        if (error.response.status === 409) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Vous avez déjà réagi à ce post` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de l'ajout de la réaction` })
    }
})

export const updateReaction = createAsyncThunk('feed/updateReaction', async ({ type, reactionId }, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data: reaction } = await api.patch(`/reactions/${reactionId}`, { type })

        return reaction
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Cette réaction n'existe pas` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la mise à jour de la réaction` })
    }
})

export const removeReaction = createAsyncThunk('feed/removeReaction', async ({ reactionId }, thunkApi) => {
    try {
        await fetchCsrfCookie()
        await api.delete(`/reactions/${reactionId}`)
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Cette réaction n'existe pas` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la suppression de la réaction` })
    }
})

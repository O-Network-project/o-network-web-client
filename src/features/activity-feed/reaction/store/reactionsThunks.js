import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from '../../../../services/api'
import { selectReaction } from './reactionsSelectors'

export const fetchReactions = createAsyncThunk('reactions/fetchReactions', async (postId, thunkApi) => {
    try {
        const { data: reactions } = await api.get(`/posts/${postId}/reactions`)
        return reactions
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Ce post n'existe pas` })
        }

        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la récupération des réactions` })
    }
})

export const createReaction = createAsyncThunk('reactions/createReaction', async ({ postId, type }, thunkApi) => {
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

export const updateReaction = createAsyncThunk('reactions/updateReaction', async ({ type, id }, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data: reaction } = await api.patch(`/reactions/${id}`, { type })

        return {
            previousReaction: selectReaction(thunkApi.getState(), id),
            updatedReaction: reaction
        }
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Cette réaction n'existe pas` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la mise à jour de la réaction` })
    }
})

export const removeReaction = createAsyncThunk('reactions/removeReaction', async ({ id }, thunkApi) => {
    try {
        await fetchCsrfCookie()
        await api.delete(`/reactions/${id}`)

        return selectReaction(thunkApi.getState(), id)
    } catch (error) {
        if (error.response.status === 404) {
            return thunkApi.rejectWithValue({ status: error.response.status, message: `Cette réaction n'existe pas` })
        }
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la suppression de la réaction` })
    }
})

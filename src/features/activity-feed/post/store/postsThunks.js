import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from '../../../../services/api'

export const fetchPosts = createAsyncThunk('feed/fetchPosts', async (userId, thunkApi) => {
    const nextPage = thunkApi.getState().feed.pagination.currentPage + 1
    const id = thunkApi.getState().user.organization?.id

    try {
        const url = userId
            ? `/users/${userId}/posts?page=${nextPage}`
            : `/organizations/${id}/posts?page=${nextPage}`

        const { data: response } = await api.get(url)

        return {
            posts: response.data,
            meta: response.meta
        }
    } catch (error) {
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite` })
    }
})

export const createPost = createAsyncThunk('feed/createPost', async (text, thunkApi) => {
    try {
        await fetchCsrfCookie()

        const { data: post } = await api.post('/posts', { text })
        post.reactions = []

        return post
    } catch (error) {
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la création du nouveau post.` })
    }
})

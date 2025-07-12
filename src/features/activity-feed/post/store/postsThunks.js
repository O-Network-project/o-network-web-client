import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, fetchCsrfCookie } from '../../../../services/api'
import { selectUserOrganizationId } from '../../../user/store/userSelectors'
import { selectActivityFeedCurrentPage } from './postsSelectors'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (userId, thunkApi) => {
    const nextPage = selectActivityFeedCurrentPage(thunkApi.getState()) + 1
    const id = selectUserOrganizationId(thunkApi.getState())

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

export const createPost = createAsyncThunk('posts/createPost', async (text, thunkApi) => {
    try {
        await fetchCsrfCookie()

        const { data: post } = await api.post('/posts', { text })
        post.reactions = []

        return post
    } catch (error) {
        return thunkApi.rejectWithValue({ status: error.response.status, message: `Une erreur s'est produite lors de la création du nouveau post.` })
    }
})

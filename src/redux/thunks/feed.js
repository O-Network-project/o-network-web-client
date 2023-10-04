import { createAsyncThunk } from '@reduxjs/toolkit'
import { setAvailablePosts } from '../reducers/feed'
import { api, fetchCsrfCookie } from "../../services/api"
import { enqueueSnackbar } from '../reducers/notifications'

export const fetchPosts = createAsyncThunk("feed/fetchPosts", async (userIdUrl, thunkApi) => {

    const currentPage = thunkApi.getState().feed.pagination.currentPage
    const id = thunkApi.getState().user.organization?.id;

    try {
        const url = userIdUrl ?
            `/users/${userIdUrl}/posts?page=${currentPage}` :
            `/organizations/${id}/posts?page=${currentPage}`

        // const { data: response } = await api.get(url);

        const response = await api.get(url);
        const { data: responses } = response
        // console.log("fetchPost response", response) //TODO Rmove

        const filteredPosts = responses.data;
        const meta = {
            currentPage: responses.meta.current_page, 
            lastPage: responses.meta.last_page
        };

        if (meta.currentPage === meta.lastPage) {
            thunkApi.dispatch(setAvailablePosts(false));
        }

        // TODO Remove Notification test
        console.log("fetchPosts response", response)
        // ##############################################
        const successValue = {
            status: response.status,
            message: "Notification test fetch Posts",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));
        // ##############################################
                     
        return filteredPosts;

    } catch (error) {
        // return thunkApi.rejectWithValue({status: 500, message: "Une erreur s'est produite"});
        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
});

export const createPost = createAsyncThunk("feed/createPost", async (text, thunkApi) => {
    try {
        await fetchCsrfCookie()
        // const { data } = await api.post('/posts',  {text: text})
        const response = await api.post('/posts',  {text: text})
        const data = response.data

        const newPost = {
            ...data,
            reactions: [],
        };

        // TODO Remove Notification test
        console.log("createPost response", response)
        // ##############################################
        const successValue = {
            status: response.status,
            message: "Notification test Create Post",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));
        // ##############################################

        return newPost

    }
    catch (error) {

        // if (error.response.status === 409){
        //     return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        // }
        // return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du nouveau post." });

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})

export const fetchComments = createAsyncThunk("feed/fetchComments", async (postId, thunkApi) => {
    try {
        const response = await api.get(`/posts/${postId}/comments`);
        const postComments = response.data;

        // TODO Remove Notification test
        console.log("fetchComments response", response)
        // ##############################################
        const successValue = {
            status: response.status,
            message: "Notification test fetch Comments",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));
        // ##############################################

        return {postComments, postId}

    }
    catch (error) {
        // if (error.response.status === 409){
        //     return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        // }
        // return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la récupération des commentaires." });

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})


export const addNewComment = createAsyncThunk("feed/addNewComment", async ({text, postId}, thunkApi) => {
    try {
        await fetchCsrfCookie()
        // const { data : newComment } = await api.post(`/posts/${postId}/comments`,  {text: text})

        const response = await api.post(`/posts/${postId}/comments`,  {text: text})
        const { data : newComment } = response

        // TODO Remove Noticication test
        console.log("Add New Comment response", response)
        // ##############################################
        const successValue = {
            status: response.status,
            message: "Noticication test Add New Comment",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));
        // ##############################################

        return {newComment, postId}
    }
    catch (error) {
        // if (error.response.status === 409){
        //     return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        // }
        // return thunkApi.rejectWithValue({ status: error.response.status, message: "Une erreur s'est produite lors de la création du commentaire." });

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})


export const addReaction = createAsyncThunk("post/addReaction", async ({postId, reaction}, thunkApi) => {
    try {
        await fetchCsrfCookie()
        const { data : newReaction } = await api.post(`/posts/${postId}/reactions`,  {type: reaction})

        return {newReaction, postId}
    }
    catch (error) {
        // if (error.response.status === 409){
        //     return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        // }
        // return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})



export const updateReaction = createAsyncThunk("post/updateReaction", async ({postId, reaction, reactionId}, thunkApi) => {

    try {
        await fetchCsrfCookie()
        const { data : updatedReaction } = await api.patch(`/reactions/${reactionId}`,  {type: reaction})
    
        return {updatedReaction, postId, reactionId}
    }
    catch (error) { 
        // if (error.response.status === 409){
        //     return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        // }
        // return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
})


export const removeReaction = createAsyncThunk("post/removeReaction", async ({postId, reactionId}, thunkApi) => {

    try {
        await fetchCsrfCookie()
        await api.delete(`/reactions/${reactionId}`,)

        // TODO Remove Noticication test
        console.log("remove Reaction response")
        // ##############################################
        const successValue = {
            // status: response.status,
            status: 200,
            message: "Noticication test remove Reaction",
            // message: response.statusText,
            options: {
                variant: 'warning',
            }
        }
        thunkApi.dispatch(enqueueSnackbar(successValue));
        // ##############################################
        
        return { postId, reactionId}
    }
    catch (error) {
        // if (error.response.status === 409){
        //     return thunkApi.rejectWithValue({ status: 409, message: "Ce post n'existe pas" });
        // }
        // return thunkApi.rejectWithValue({ status: 500, message: "Une erreur s'est produite lors de l'ajout de la reaction" });

        const errorValue = {
            status: error.response.status,
            message: "",
            options: {
                variant: 'error',
            },
        }

        if (error.response.data.errors) {
            const getError = error.response.data.errors

            Object.keys(getError).forEach(key => {
                const errorMessages = getError[key];
                if (errorMessages) {
                    errorMessages.forEach(errorMessage => {
                        errorValue.message = errorMessage
                    })
                }
            })
        }

        // if (error.response.status === 500) {
        //     errorValue.message = "Une erreur s'est produite"
        // }

        thunkApi.dispatch(enqueueSnackbar(errorValue));
        return thunkApi.rejectWithValue(errorValue)
    }
});

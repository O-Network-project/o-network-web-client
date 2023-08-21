import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        enqueueSnackbar: (state, action) => {
            console.log('enqueue', action.payload) // TODO delete
            const toEdit = {...action.payload}
            delete toEdit.status // Delete status value
            console.log('to delete - status', toEdit) // TODO delete

            state.notifications.push(toEdit);
            // state.notifications.push(action.payload);
            // console.log('enqueue state notifications', state.notifications) // TODO delete
        },
        closeSnackbar: (state, action) => {
            console.log('close', action.payload) // TODO delete
            const { key, dismissAll } = action.payload;
            state.notifications = state.notifications.map(notification => (
                (dismissAll || notification.key === key)
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            ));
            // console.log('close state notifications', state.notifications) // TODO delete
        },
        removeSnackbar: (state, action) => {
            console.log('state', state) // TODO delete
            console.log('remove', action.payload) // TODO delete
            state.notifications = state.notifications.filter(
                notification => notification.key !== action.payload.key
            );
            console.log('remove state notifications', state.notifications) // TODO delete
        },
    },
});

export const {
    enqueueSnackbar,
    closeSnackbar,
    removeSnackbar,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
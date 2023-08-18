import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        enqueueSnackbar: (state, action) => {
            console.log('enqueue', action.payload) // TODO delete
            state.notifications.push(action.payload);
        },
        closeSnackbar: (state, action) => {
            console.log('close', action.payload) // TODO delete
            const { key, dismissAll } = action.payload;
            state.notifications = state.notifications.map(notification => (
                (dismissAll || notification.key === key)
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            ));
        },
        removeSnackbar: (state, action) => {
            console.log('remove', action.payload) // TODO delete
            state.notifications = state.notifications.filter(
                notification => notification.key !== action.payload.key
            );
        },
    },
});

export const {
    enqueueSnackbar,
    closeSnackbar,
    removeSnackbar,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
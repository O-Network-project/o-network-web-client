import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        notifications: [],
    },
    reducers: {
        enqueueSnackbar: (state, action) => {
            const editedData = {...action.payload}
            delete editedData.status
            state.notifications.push(editedData);
        },
        closeSnackbar: (state, action) => {
            const { key, dismissAll } = action.payload;
            state.notifications = state.notifications.map(notification => (
                (dismissAll || notification.key === key)
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            ));
        },
        removeSnackbar: (state, action) => {
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
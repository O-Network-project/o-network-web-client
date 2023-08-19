import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeSnackbar } from '../../redux/reducers/notifications';
import {Button} from '@mui/material/';

let displayed = [];

const useNotifier = () => {
    console.log('notifier') // TODO delete
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications.notifications || []);
    console.log('notifications', notifications) // TODO delete
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const storeDisplayed = (id) => {
        displayed = [...displayed, id];
    };

    const removeDisplayed = (id) => {
        displayed = [...displayed.filter(key => id !== key)];
    };

    useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                closeSnackbar(key);
                return;
            }

            if (displayed.includes(key)) return;

            const snackbarOptions = {
                key,
                ...options,
                onClose: (event, reason, myKey) => {
                    if (options.onClose) {
                        options.onClose(event, reason, myKey);
                    }
                },
                action: (key) => (
                    <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
                ),
                onExited: (event, myKey) => {
                    dispatch(removeSnackbar(myKey));
                    removeDisplayed(myKey);
                },
            };
            enqueueSnackbar(message, snackbarOptions);
            storeDisplayed(key);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
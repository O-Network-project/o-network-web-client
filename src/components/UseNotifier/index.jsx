import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { removeSnackbar } from '../../redux/reducers/notifications';
import {Button} from '@mui/material/';

const useNotifier = () => {
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notifications.notifications);
    // console.log('notifications', notifications) // TODO delete
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        notifications.forEach(({ key, message, options = {}, dismissed = false }) => {
            if (dismissed) {
                closeSnackbar(key);
                return;
            }

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
                },
            };
            enqueueSnackbar(message, snackbarOptions);
        });
    }, [notifications, closeSnackbar, enqueueSnackbar, dispatch]);
};

export default useNotifier;
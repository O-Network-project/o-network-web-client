import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../features/user/store/userThunks'
import { Router } from '../../routes/Router'
import { LoadingLayout } from '../../layouts/LoadingLayout'
import { ErrorPageHandler } from '../../routes/ErrorPageHandler'
import { ErrorCode, setErrorPage } from '../../store/errorPageSlice'

export function App() {
    const dispatch = useDispatch()
    const [isFetchingUser, setIsFetchingUser] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchUser()).unwrap()
            } catch {
                dispatch(setErrorPage(ErrorCode.INTERNAL_SERVER_ERROR))
            } finally {
                setIsFetchingUser(false)
            }
        })()
    }, [dispatch])

    return (
        isFetchingUser
            ? <LoadingLayout />
            : <ErrorPageHandler>
                <Router />
            </ErrorPageHandler>
    )
}

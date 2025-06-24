import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserOrganizationId } from '../features/user/store/userSelectors'
import { UserProfile } from '../features/user/pages/UserProfile'
import { Home } from '../pages/Home'
import { OrganizationCreation } from '../features/organization/pages/OrganizationCreation'
import { Administration } from '../features/admin/pages/Administration'
import { ProfileSettings } from '../features/user/pages/ProfileSettings'
import { Contact } from '../pages/Contact'
import { SignUp } from '../features/user/pages/SignUp'
import { OrganizationHome } from '../features/organization/pages/OrganizationHome'
import { AdminRoute } from './ConditionalRoute/AdminRoute'
import { GuestRoute } from './ConditionalRoute/GuestRoute'
import { AuthenticatedRoute } from './ConditionalRoute/AuthenticatedRoute'
import { NotFoundRoute } from './NotFoundRoute'
import { useAxiosInterceptors } from './useAxiosInterceptors'
import { OrganizationRouteValidator } from './OrganizationRouteValidator'

export function Router() {
    // Axios interceptors for all requests
    useAxiosInterceptors()

    const organizationId = useSelector(selectUserOrganizationId)

    return (
        <Routes>
            <Route path="/" element={
                <GuestRoute redirectTo={`/${organizationId}`}>
                    <Home />
                </GuestRoute>
            } />
            <Route path="/new-organization" element={
                <GuestRoute>
                    <OrganizationCreation />
                </GuestRoute>
            } />
            <Route path="/sign-up" element={
                <GuestRoute>
                    <SignUp />
                </GuestRoute>
            } />
            <Route path="/about" element={<Contact />} />

            <Route path="/:organizationId" element={<OrganizationRouteValidator />}>
                <Route index element={
                    <AuthenticatedRoute>
                        <OrganizationHome />
                    </AuthenticatedRoute>
                } />
                <Route path="user/:userId" element={
                    <AuthenticatedRoute>
                        <UserProfile />
                    </AuthenticatedRoute>
                } />
                <Route path="user/:userId/edit" element={
                    <AuthenticatedRoute>
                        <ProfileSettings />
                    </AuthenticatedRoute>
                } />
                <Route path="admin/members" element={
                    <AuthenticatedRoute>
                        <AdminRoute>
                            <Administration />
                        </AdminRoute>
                    </AuthenticatedRoute>
                } />
            </Route>

            <Route path="/*" element={<NotFoundRoute />} />
        </Routes>
    )
}

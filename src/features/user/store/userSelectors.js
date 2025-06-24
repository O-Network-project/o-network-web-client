import { createSelector } from '@reduxjs/toolkit'

export const selectUser = state => state.user

export const selectName = createSelector(
    [selectUser],
    user => user.name
)

export const selectIsLogged = createSelector(
    [selectName],
    name => name !== ''
)

export const selectUserOrganization = createSelector(
    [selectUser],
    user => user.organization
)

export const selectUserOrganizationId = createSelector(
    [selectUserOrganization],
    organization => organization?.id
)

export const selectUserOrganizationName = createSelector(
    [selectUserOrganization],
    organization => organization?.name
)

export const selectUserId = createSelector(
    [selectUser],
    user => user.id
)

export const selectUserRole = createSelector(
    [selectUser],
    user => user.role
)

export const selectIsAdmin = createSelector(
    [selectUser],
    user => user.role === 'admin'
)

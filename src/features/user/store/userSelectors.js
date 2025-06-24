import { createSelector } from '@reduxjs/toolkit'

export const getUser = state => state.user

export const getName = createSelector(
    [getUser],
    user => user.name
)

export const getIsLogged = createSelector(
    [getName],
    name => name !== ''
)

export const getUserOrganization = createSelector(
    [getUser],
    user => user.organization
)

export const getUserOrganizationId = createSelector(
    [getUserOrganization],
    organization => organization?.id
)

export const getUserOrganizationName = createSelector(
    [getUserOrganization],
    organization => organization?.name
)

export const getUserId = createSelector(
    [getUser],
    user => user.id
)

export const getUserRole = createSelector(
    [getUser],
    user => user.role
)

export const getIsAdmin = createSelector(
    [getUser],
    user => user.role === 'admin'
)

export const selectUser = state => state.user

export const selectUserName = state => selectUser(state).name

export const selectUserIsLogged = state => selectUserName(state) !== ''

export const selectUserOrganization = state => selectUser(state).organization

export const selectUserOrganizationId = state =>
    selectUserOrganization(state)?.id

export const selectUserOrganizationName = state =>
    selectUserOrganization(state)?.name

export const selectUserId = state => selectUser(state).id

export const selectUserRole = state => selectUser(state).role

export const selectUserIsAdmin = state => selectUserRole(state) === 'admin'

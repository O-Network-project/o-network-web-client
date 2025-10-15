export const selectUser = state => state.user

export const selectUserIsLogged = state => selectUser(state).name !== ''

export const selectUserOrganizationId = state =>
    selectUser(state).organization?.id

export const selectUserOrganizationName = state =>
    selectUser(state).organization?.name

export const selectUserId = state => selectUser(state).id

export const selectUserIsAdmin = state => selectUser(state).role === 'admin'

import { createEntityAdapter } from '@reduxjs/toolkit'

export const reactionsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
})

import { createEntityAdapter } from '@reduxjs/toolkit'

export const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt)
})

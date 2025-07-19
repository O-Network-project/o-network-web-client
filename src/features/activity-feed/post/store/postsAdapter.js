import { createEntityAdapter } from '@reduxjs/toolkit'

export const postsAdapter = createEntityAdapter({
    // Multiplied by -1 to sort in descending order
    sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt) * -1
})

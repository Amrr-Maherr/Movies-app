import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import type { HeroMedia } from '@/types'
import toast from 'react-hot-toast';
export type ListItem = HeroMedia

interface ListState {
    value: ListItem[]
}

const initialState: ListState = {
    value: [],
}

export const ListReducer = createSlice({
    name: 'my-list',
    initialState,
    reducers: {
        addToList: (state, action: PayloadAction<ListItem>) => {
            const exists = state.value.some((item) => item.id === action.payload.id)
            if (!exists) {
                state.value.push(action.payload)
                toast.success('Added to My List!')
            }
        },
        removeFromList: (state, action: PayloadAction<number>) => {
            state.value = state.value.filter((item) => item.id !== action.payload)
            toast.success('Removed from My List!')
        },
        clearList: (state) => {
            state.value = []
            toast.success('My List cleared!')
        },
    },
})

export const { addToList, removeFromList, clearList } = ListReducer.actions

export const selectList = (state: RootState) => state.list.value

export const selectIsInList = (state: RootState, itemId: number) =>
    state.list.value.some((item) => item.id === itemId)

export const selectListItemById = (state: RootState, itemId: number) =>
    state.list.value.find((item) => item.id === itemId)

export const selectListCount = (state: RootState) => state.list.value.length

export default ListReducer.reducer
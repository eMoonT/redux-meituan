import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
    name: "foods",
    initialState: {
        foodsList: [],
        activeIndex: 0,
        cartList: [],
    },
    reducers: {
        setFoodsList: (state,action) => {
            state.foodsList = action.payload
        },
        setActiveIndex: (state, action) => {
            state.activeIndex = action.payload
        },
        addCard: (state,action) => {
            const item = state.cartList.find(item => item.id === action.payload.id)
            if (item) {
                item.count++
            } else {
                state.cartList.push({...action.payload,count: 1})
            }
        },
        minusCard: (state,action) => {
            const item = state.cartList.find(item => item.id === action.payload)            
            if (item.count > 0) {
                item.count--
            }
            if (state.cartList.reduce((a, b) => a + b.count, 0) === 0) {
                state.cartList = []
            }
        },
        plusCard: (state, action) => {
            const item = state.cartList.find(item => item.id === action.payload)            
            item.count++
        },
        cleanCard: (state) => {
            state.cartList = []
        }
    }
})

const { setFoodsList,setActiveIndex,addCard,minusCard,plusCard,cleanCard } = foodsStore.actions

const fetchFoodsList = () => {
    return async (dispatch) => {
        const res = await axios.get("http://localhost:3004/takeaway")
        dispatch(setFoodsList(res.data))
    }
}

export { fetchFoodsList,setActiveIndex,addCard,minusCard,plusCard,cleanCard }

const foodsReducer = foodsStore.reducer

export default foodsReducer

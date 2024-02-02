import { csrfFetch } from "../store/csrf";
import { createSlice } from "@reduxjs/toolkit"

export const orderSlice = createSlice({
    name: "orders",
    initialState: {
        allOrders: null,
        singleOrder: null,
    },
    reducers: {
        loadOrders: (state, action) => {
           state.allOrders = action.payload
        },
        // singleOrder: (state, action) => {
        //   state.singleOrder = action.payload
        // },
        addOrder:(state, action)=>{
            state.singleOrder = action.payload
        },
        editOrder:(state, action)=>{
            state.singleOrder = action.payload
        },
        // removeOrder:(state, action)=>{
        //     state.allOrders
        // }
    }
})

export const {loadOrders, addOrder, editOrder} = orderSlice.actions

//get all orders
export const getOrders = () => async (dispatch) => {
  const response = await csrfFetch("/api/orders/user");

  if (response.ok) {
    const list = await response.json();
    dispatch(loadOrders(list));
    return list;
  }
};

//get all orders
export const getUserOrders = () => async (dispatch) => {
  const response = await csrfFetch("/api/orders/user");

  if (response.ok) {
    const list = await response.json();
    dispatch(loadOrders(list));
    return list;
  }
};

// //single order
// export const spotDetails = (orderId) => async (dispatch) => {
//   const response = await fetch(`/api/orders/${orderId}`);

//   if (response.ok) {
//     const order = await response.json();
//     dispatch(singleOrder(order));
//     return order;
//   }
// };

//create order
export const createOrder = (order) => async (dispatch) => {
  const response = await csrfFetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (response.ok) {
    const newOrder = await response.json();

    dispatch(addOrder(newOrder));
    return newOrder;
  }
};

//update order
export const updateOrder = (order, id) => async (dispatch) => {
  const response = await csrfFetch(`/api/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (response.ok) {
    const edit = await response.json();
    dispatch(editOrder(edit));
    return edit;
  }
};

// //delete order
// export const deleteOrder = (id) => async (dispatch) => {
//   const response = await csrfFetch(`/api/orders/${id}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     await response.json();
//     dispatch(removeOrder(id));
//   }
// };

export default orderSlice.reducer;

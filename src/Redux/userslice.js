import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  users: [],
  activeUsers: '',
  conection: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signup(state, action) {
      state.users.push(action.payload);
      AsyncStorage.setItem('allUsers', JSON.stringify(state.users));
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    login(state, action) {
      const user = state.users.filter(user => user.email === action.payload);
      state.activeUsers = user[0].name;
      AsyncStorage.setItem('activeUser', JSON.stringify(state.activeUsers));
    },
    setActiveUser(state, action) {
      state.activeUsers = action.payload;
    },
    logout(state) {
      state.activeUsers = '';
      AsyncStorage.removeItem('activeUser');
    },
    connect(state,action){
      state.conection = action.payload
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;

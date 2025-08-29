/** Redux slice for app mock data and preferences */
const INITIAL = {
  notifications: [],
  tasks: [],
  meetings: [],
  leaves: [],
  attendance: [],
  preferences: {
    notificationsEnabled: true,
  }
};

const SET_DATA = 'data/SET_DATA';
const ADD_NOTIFICATION = 'data/ADD_NOTIFICATION';
const UPDATE_PREFERENCES = 'data/UPDATE_PREFERENCES';

export default function dataReducer(state = INITIAL, action) {
  switch (action.type) {
    case SET_DATA:
      return { ...state, ...action.payload };
    case ADD_NOTIFICATION:
      return { ...state, notifications: [action.payload, ...state.notifications] };
    case UPDATE_PREFERENCES:
      return { ...state, preferences: { ...state.preferences, ...action.payload } };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export const setData = (payload) => ({ type: SET_DATA, payload });

// PUBLIC_INTERFACE
export const addNotification = (notification) => ({ type: ADD_NOTIFICATION, payload: notification });

// PUBLIC_INTERFACE
export const updatePreferences = (prefs) => ({ type: UPDATE_PREFERENCES, payload: prefs });

// PUBLIC_INTERFACE
export const selectData = (state) => state.data;

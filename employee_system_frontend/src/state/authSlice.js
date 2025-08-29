/** Redux slice for authentication and RBAC */
const INITIAL = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Action Types
const LOGIN_START = 'auth/LOGIN_START';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_ERROR = 'auth/LOGIN_ERROR';
const LOGOUT = 'auth/LOGOUT';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';

// Reducer
export default function authReducer(state = INITIAL, action) {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload.user, token: action.payload.token };
    case LOGIN_ERROR:
      return { ...state, loading: false, error: action.payload };
    case REGISTER_SUCCESS:
      return { ...state, loading: false };
    case LOGOUT:
      return { ...INITIAL };
    default:
      return state;
  }
}

// PUBLIC_INTERFACE
export const selectAuth = (state) => state.auth;

// PUBLIC_INTERFACE
export const loginStart = () => ({ type: LOGIN_START });

// PUBLIC_INTERFACE
export const loginSuccess = (payload) => ({ type: LOGIN_SUCCESS, payload });

// PUBLIC_INTERFACE
export const loginError = (err) => ({ type: LOGIN_ERROR, payload: err });

// PUBLIC_INTERFACE
export const registerSuccess = () => ({ type: REGISTER_SUCCESS });

// PUBLIC_INTERFACE
export const logout = () => ({ type: LOGOUT });

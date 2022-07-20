import { 
  CHANGE_SEARCH_TEXT , 
  INITIALISE_FILTERED_POSITIONS,
  ADD_FAVORITE_POSITION,
  DELETE_FAVORITE_POSITION,
  CHANGE_DETAIL_POSITION,
  CHANGE_INPUT,
  CHANGE_IS_USER_CONNECTED_TO_TRUE,
  INITIALISE_USER,
  CHANGE_ERROR_MESSAGE_SIGNIN_FORMULAR,
  CHANGE_ERROR_MESSAGE_SIGNUP_FORMULAR
} 
from '../actions';

import data from '../data/yoga_api';

const initialState = {
  allPositions : data,
  searchText :"",
  userPseudonym :"",
  userEmail :"",
  userPassword :"",
  isUserConnected :false,
  favoritePositions:[],
  detailPosition : {},
  errorMessageSigninFormular :"",
  errorMessageSignupFormular :"",
  errorStatusCode:"",
};

// le reducer est une fonction qui prend le state courant et l'action courante
// en paramètre, en fonction de l'action le reducer va retourner un nouveau state
// sa responsabitlité sera de retourner un state
// traducteur d'intention en modification de state
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT: {
      console.log('reducer CHANGE_SEARCH_TEXT');
      return {
        ...state,
        searchText: action.searchText,
      };
    }
    case CHANGE_INPUT: {
      console.log('reducer CHANGE_INPUT');
      return {
        ...state,
        [action.name]: action.value,
      };
    }
    case CHANGE_IS_USER_CONNECTED_TO_TRUE: {
      console.log('reducer CHANGE_IS_USER_CONNECTED_TO_TRUE');
      return {
        ...state,
        isUserConnected: true,
      };
    }
    case CHANGE_ERROR_MESSAGE_SIGNIN_FORMULAR: {
      console.log('reducer CHANGE_ERROR_MESSAGE_SIGNIN_FORMULAR');
      return {
        ...state,
        errorMessageSigninFormular: action.errorMessage,
      };
    }
    case CHANGE_ERROR_MESSAGE_SIGNUP_FORMULAR: {
      console.log('reducer CHANGE_ERROR_MESSAGE_SIGNUP_FORMULAR');
      return {
        ...state,
        errorMessageSignupFormular: action.errorMessage,
      };
    }
    case INITIALISE_USER: {
      console.log('reducer INITIALISE_USER');
      return {
        ...initialState,
      };
    }
    case INITIALISE_FILTERED_POSITIONS: {
      console.log('reducer INITIALISE_FILTERED_POSITIONS');      
      return {
        ...state,
        filteredPositions : state.allPositions
      };
    }
    case ADD_FAVORITE_POSITION: {
      console.log('reducer ADD_FAVORITE_POSITION');
      const position = state.allPositions.find((item) => item.id.toString() === action.id);
      let positions = [...state.favoritePositions];
      positions.push(position);
      // delete double
      positions = [...new Set(positions)];
      return {
        ...state,
        favoritePositions : positions

      };
    }
    case DELETE_FAVORITE_POSITION: {
      console.log('reducer DELETE_FAVORITE_POSITION');      
      const positions = state.favoritePositions.filter((item) => item.id.toString() !== action.id);
      return {
        ...state,
        favoritePositions : positions
      };
    }
    case CHANGE_DETAIL_POSITION: {
      console.log('reducer CHANGE_DETAIL_POSITION');
      const position = state.allPositions.find((item) => item.id.toString() === action.id);
      return {
        ...state,
        detailPosition : position,
      };
    }
    default:
      return state;
  }
};

export default reducer;

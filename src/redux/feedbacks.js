import * as ActionTypes from './ActionTypes';


export const Feedbacks = (state = {
    // errMess: null,
    feedbacks: []
}, action) => {
switch(action.type) {
    // case ActionTypes.ADD_COMMENTS:
    //     return {...state, errMess: null, comments: action.payload};
  
    //   case ActionTypes.COMMENTS_FAILED:
    //     return {...state, errMess: action.payload};
  
      case ActionTypes.ADD_FEEDBACK:
          var feedback = action.payload;
          return { ...state, feedbacks: state.feedbacks.concat(feedback)};
  
      default:
        return state;
}
}
import {
    SAVE_MESSAGE,
} from '../_actions/types';

// 첫 번째 인자는 이전 상태
export default function (state = {messages:[]}, action) {
    switch (action.type) {
        case SAVE_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.payload)
            }
        default:
            return state;
    }
}
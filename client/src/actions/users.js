import * as userConstants from '../constants/userConstants'

export function setUserId(id) {
    return {
        type: userConstants.SET_USER_ID,
        userId: id
    }
}
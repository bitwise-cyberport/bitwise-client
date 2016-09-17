import * as miscConstants from '../constants/miscConstants'

export function setUserId(id) {
    return {
        type: miscConstants.SET_USER_ID,
        userId: id
    }
}

export function setMessage(isError, text) {
    return {
        type: miscConstants.SET_MESSAGE,
        message: {
            isError,
            text
        }
    }
}
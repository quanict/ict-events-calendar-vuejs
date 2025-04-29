export const GET_MESSAGE = "get_message"
export const SET_MESSAGE = "set_message"

const state = {
    message: '',
}

const getters = {
    [GET_MESSAGE](state: any) { return state.message },
}

const mutations = {
    async [SET_MESSAGE](state: any,  msg: string) {
        state.message = msg
    }
}

const actions = {}

export default {
    state,
    getters,
    mutations,
    actions,
};
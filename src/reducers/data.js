const data = (data = {}, action) => {
    if (action.type === "UPDATE_DATA"){
        return action.data
    } else {
        return data
    }
}

export default data
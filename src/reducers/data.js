const data = (data = {}, action) => {
    if (action.type === "UPDATE"){
        return action.data
    } else {
        return data
    }
}

export default data
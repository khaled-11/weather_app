const coordinates = (coordinates = ["-74.006","40.7127"], action) => {
    if (action.type === "UPDATE_COORDINATES"){
        return action.coordinates
    } else {
        return coordinates
    }
}

export default coordinates
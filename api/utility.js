const isNullorUndefinedorEmpty = (value) => {
    let isvalid = false
    if (value !== null && value !== undefined && value !== "") {
        isvalid = true
    }
    return isvalid
}

module.exports = isNullorUndefinedorEmpty
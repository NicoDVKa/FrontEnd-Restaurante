const maxlength = 255

export function maxLengthValidation(string) {
    return (string.length < 1 || string.length > maxlength)? false : true
}



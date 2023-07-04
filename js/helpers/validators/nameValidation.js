const nameRegex = /^[\p{L}\p{M}\s]{1,50}$/u

export function nameValidation(name){
    return nameRegex.test(name)?  true :  false
}
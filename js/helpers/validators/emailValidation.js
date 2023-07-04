const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export function emailValidation(email){
    return emailRegex.test(email)?  true :  false
}
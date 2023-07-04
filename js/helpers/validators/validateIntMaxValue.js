const intMaxValue = 2147483647

export function validateIntMaxValue(int){
    return (int < 1 || int > intMaxValue) ? false : true
}

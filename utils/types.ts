export interface  ResponseFunc {
    GET ?: Function
    PUT ?: Function
    POST ?: Function
    DELETE ?: Function
}

export interface Todo {
    item: string,
    completed: boolean
}
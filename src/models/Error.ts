export default class Error {
    constructor(readonly status: number, readonly message: string) {
        this.status = status;
        this.message = message;
    }
}
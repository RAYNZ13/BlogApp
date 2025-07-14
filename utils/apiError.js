class ApiError extends Error{
    constructor(
        statusCode,
        message = "Somethind went wrong",
        errors = [], //puth the error
        stack = "" //stack tray of WHERE the errors are
    ){
        super(message) //method to call the construct of the parent class which "Error" in this case
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = this.errors;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.contructor)
        }
    }
}

export {ApiError}
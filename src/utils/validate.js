export const checkValidData =(email, password)=>{
    const isEmailValid =/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password); //min 8, 1 uppercase, 1 lowercase, 1 no., 1 special character
    //const isNamevalid = /^([a-zA-Z ]){2,30}$/.test(name);
    if(!isEmailValid && !isPasswordValid) return "EmailId & Password both are not valid";
    else if(!isEmailValid) return "Email Id is not valid";
    else if(!isPasswordValid) return "Password is not valid";
    
    return null; // if everything valid

}
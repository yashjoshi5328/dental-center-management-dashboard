const validateEmail = (value,setError) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!value) {
        setError('Email is required!');
        return false;
    } else if (!emailRegex.test(value)) {
        setError('Invalid email!');
        return false;
    } else{
        setError('');
        return true;
    }
};
const validatePassword = (value,setError)=>{
    if(!value){
        setError('Password is required!');
        return false;
    }else{
        setError('');
        return true;
    }
}
const useValidate=({email,password,setEmailError,setPasswordError})=>{
    if(!validateEmail(email,setEmailError)) return false;
    if(!validatePassword(password,setPasswordError))return false;
    return true;
};

export default useValidate;
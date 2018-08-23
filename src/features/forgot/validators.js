
function validate(values: any) {
    let errors: any = {};
    
    if(!values.email){
       errors.email = "Заполните поле"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Некорректный email";
    }
    return errors;
}

export default validate;
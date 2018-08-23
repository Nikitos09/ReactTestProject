function validate(values: any) {
    let errors: any = {};
    if(!values.name){
        errors.name = "Заполните поле"
    }
    if(!values.email){
        errors.email = "Заполните поле"
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Некорректный email";
    }
    if(!values.password){
        errors.password ="Заполните поле";
    }
    else if(values.password.length < 6){
        errors.password = "Минимум 6 символов";
    }
    if(!values.confirm_password){
        errors.confirm_password = "Заполните поле";
    }
    else if(values.confirm_password !== values.password){
        errors.confirm_password = "Пароли не совпадают";
    }
    return errors;
}

export default validate;
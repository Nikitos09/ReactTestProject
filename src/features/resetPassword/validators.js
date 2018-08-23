
function validate(values: any) {
    let errors: any = {};
    
    if(!values.newPassword){
        errors.newPassword ="Заполните поле";
    }
    else if(values.newPassword.length < 6){
        errors.newPassword = "Минимум 6 символов";
    }
    if(!values.confirm_newPassword){
        errors.confirm_newPassword = "Заполните поле";
    }
    else if(values.confirm_newPassword !== values.newPassword){
        errors.confirm_newPassword = "Пароли не совпадают";
    }
    return errors;
}

export default validate;
const validation = (values)=>{
    
    let errors={};
    
   if (!values.fullname){
        errors.fullname="Name is required";
    }
    if (!values.email){
        errors.email="Email is required";
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)){
        errors.email="Email is invalid";
    }
    if(!values.password){
        errors.password="password is required";
    }else if (values.password.length<5){
        errors.password="password must be more than five character";
    }

    return errors;
}
export default validation
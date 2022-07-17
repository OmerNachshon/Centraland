import React, { } from 'react'
import SignupForm from './SignupForm';



const Form = (setUserInfo) => {
    const formIsSumbitted=false;
    
    

return <div>
    {!formIsSumbitted && <SignupForm setUserInfo={setUserInfo} submitForm={formIsSumbitted}/>}
    
</div>
};

export default Form;

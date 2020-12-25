// import React from 'react';
// import {reduxForm, Field} from 'redux-form';
// import Input from './input';


// const renderInput = ({ input, meta }) => <Input {...input} type="text" errorMessage={meta.touched && meta.error} />;

// const onSubmit = values => {
//     alert("hello!!!")
// }

// const required = value => {
//     if(!value || value === ''){
//         return "This field is required"
//     }
//     return undefined
// }

// const ReduxForm = ({handleSubmit, valid}) => (
//     <div>
//         <h2>Redux Form</h2>
//         <form onSubmit={handleSubmit}>
//             <Field name="costumer-id" component={renderInput} validate={required}/>
//             <button disabled={!valid} type="submit">Submit</button>
//         </form>
//     </div>
// );

// export default reduxForm({
//     form: "register-form",
//     onSubmit,
// })(ReduxForm);
import { combineForms } from 'react-redux-form';


let forms = combineForms({
  login: { // Initial Login State
    email: '',
    password: '',
  },
}, 'forms')

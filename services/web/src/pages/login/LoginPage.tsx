import React from "react";
import { Formik } from 'formik';

const LoginPage: React.FunctionComponent<{}> = (props) => {
  return (
    <div className="App">
      <h3>Login page</h3>
      <Formik
        initialValues={{email: '' , password:'', error = null}}
        
      >
        
      </Formik>
    </div>
  );
};

export default LoginPage;

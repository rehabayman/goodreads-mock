import React, { useEffect, useState} from 'react';
import { Route, Redirect } from 'react-router-dom'
import jwtDecode from 'jwt-decode';

const PrivateRoute = ({ component: Component, ...rest }) => {

 
  const [isAuthenticated, setIsAuthenticated] = useState(null)  

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    let token = user? user.accessToken: ""
        if(token){
            let tokenExpiration = jwtDecode(token).exp;
            let dateNow = new Date();          

            if(tokenExpiration < dateNow.getTime()/1000){
                setIsAuthenticated(false)
            }else{
                setIsAuthenticated(true)
            }
        } else {
           setIsAuthenticated(false)
        }
    // eslint-disable-next-line
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  return (
    <Route {...rest} render={props =>
      !isAuthenticated ? (
        <Redirect to='/login'/>
      ) : (
        <Component {...props} />
      )
    }
    />
  );
};

export default PrivateRoute;
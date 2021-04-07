import './App.css';
import { useEffect } from 'react';
import axios from 'axios';
import AlertsHome from './components/home/alertsHome.jsx';
import Info from './components/info/info.jsx';
import UserProfile from './components/perfil/userProfile.jsx';
import Contact from './components/contact/contact.jsx';
import Register from './components/register/register.jsx';
import Login from './components/login/login.jsx';
import Comment from './components/comment/comment.jsx';
import AlertForm from './components/alertForm/alertForm.jsx';
import AlertView from './components/alert/alertView.jsx';
import AlertFound from './components/status/alertFound.jsx'
import AlertAtHome from './components/status/alertAtHome.jsx'
import AlertLost from './components/status/alertLost.jsx'
import UserPassword from './components/perfil/userPassword.jsx';
import UpdateAnimal from './components/perfil/updateAnimal.jsx';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import PrivateRoute from './utility/privateRouter.jsx';
// import { AUTH_TOKEN } from './components/constants/constant.jsx'
// import setAuthToken from './utility/authToken'

function App() {

  // useEffect(() => {
  //   let token = localStorage.getItem(AUTH_TOKEN)
  //   if(token) {
  //     autoLogin(token);
  //   }
  // }, [])

  // const autoLogin = token => {
  //   //llamar backend para verificar
  // }

  useEffect(() => {
    axios.get("http://localhost:5000/")
    .then(response => {
      console.log(response)
    })
  }, [])


  return (
    <div className="App">
     
    <Router>
      <nav>
        <Link to='/'>HOME</Link>
        <Link to='/perdidos'>PERDIDOS</Link>
        <Link to='/encontrados'>ENCONTRADOS</Link>
        <Link to='/encasa'>EN CASA</Link>
        <Link to='/info'>INFORMACION</Link>
        <Link to='/myprofile'>PERFIL</Link>
        <Link to='/contacto'>CONTACTO</Link>
      </nav>

      <Switch>
        <Route path='/' component={AlertsHome} exact/>
        
        <Route path='/registro' component={Register} />
        
        <Route path='/login' component={Login} />
      
        <PrivateRoute path='/myprofile'> 
          <UserProfile/>
        </PrivateRoute>

        <PrivateRoute path='/password/:id' component={UserPassword}/> 
      
        <PrivateRoute path='/addalert/:id'>
          <AlertForm/>
        </PrivateRoute>
    
        <Route path='/veranimal/:id' component={AlertView} />

        <PrivateRoute path='/addcomment/:id' component={Comment} />

        <PrivateRoute path='/updateanimal/:id' component={UpdateAnimal} />

        <Route path='/encontrados' component={AlertFound} />

        <Route path='/perdidos' component={AlertLost} />

        <Route path='/encasa' component={AlertAtHome} />

        <Route path='/contacto' component={Contact} />

        <Route path='/info' component={Info} />

      </Switch>
        
    </Router>

    </div>
  );
}

export default App;

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
import Footer from './components/general/footer.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utility/privateRouter.jsx';
import Modal from 'react-modal';
Modal.setAppElement('#root')


function App() {

  return (
    <div className="App">
      
    <Router>
        
      <Switch>

        <Route path='/' component={AlertsHome} exact/>
        
        <Route path='/registro' component={Register} />
        
        <Route path='/login' component={Login} />
      
        <PrivateRoute path='/myprofile'> 
          <UserProfile/>
        </PrivateRoute>

        <PrivateRoute path='/password/:id' component={UserPassword}/> 
      
        <PrivateRoute path='/addalert' component={AlertForm} />
    
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

   <Footer />

    </div>
  );
}

export default App;

import './App.css';
import AlertsHome from './components/home/AlertsHome';
import Info from './components/info/Info';
import UserProfile from './components/perfil/UserProfile';
import Contact from './components/contact/Contact';
import Register from './components/register/Register';
import Login from './components/login/Login';
import Comment from './components/comment/Comment';
import AlertForm from './components/alertForm/AlertForm';
import AlertView from './components/alert/AlertView';
import AlertFound from './components/status/AlertFound';
import AlertAtHome from './components/status/AlertAtHome';
import AlertLost from './components/status/AlertLost';
import UserPassword from './components/perfil/UserPassword';
import UpdateAnimal from './components/perfil/UpdateAnimal';
import Footer from './components/general/Footer';
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

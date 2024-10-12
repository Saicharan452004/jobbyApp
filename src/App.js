import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login/index'
import NotFound from './components/NotFound/index'
import Home from './components/Home/index'
import AllJobs from './components/AllJobs/index'
import ProtectedRoute from './components/ProtectedRoute'
import SpecificjobDetails from './components/SpecificjobDetails'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={AllJobs} />
    <ProtectedRoute exact path="/jobs/:id" component={SpecificjobDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App

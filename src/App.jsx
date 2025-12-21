import { useState } from 'react'
import { Switch, Route } from "react-router-dom";
import Home from './pages/Home.jsx';
import Order from './pages/Order.jsx';
import Success from './pages/Success.jsx';
import './App.css';

function App() {
  const [orderData, setOrderData] = useState(null);//

  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/order' render={(props) => <Order {...props} setOrderData={setOrderData} />} />
      <Route path='/success' render={(props) => <Success {...props} orderData={orderData} />} />
    </Switch>
  )
}

export default App

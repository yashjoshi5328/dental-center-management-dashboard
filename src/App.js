import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './globalComponent/Login';
const App = () => {
  return (
    <Login/>
  )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App/>);

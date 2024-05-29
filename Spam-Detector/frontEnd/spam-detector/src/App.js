
import './App.css';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Layout from './Layout';
import Dashboard from './components/Dashboard';
import { Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom';
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        
    
  
      </Route>)
  );
  
  return <RouterProvider  router={router}></RouterProvider>;
  
}

export default App;

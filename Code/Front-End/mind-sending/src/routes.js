import React from 'react';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import About from './pages/HomePage/About';
import Dashboard from './pages/DashboardPage/Dashboard';
import Automations from './pages/DashboardPage/Automations';
import Lists from './pages/DashboardPage/Lists';
import Campaigns from './pages/DashboardPage/Campaigns';
import Reports from './pages/DashboardPage/Reports';

const routes = [
{
	path:'/',
	exact : true,
	main: () => <Home />
},
{
	path:'/login',
	exact : false,
	main: () => <Login />
},
{
	path:'/automations',
	exact : false,
	main: () => <Automations />
},
{
	path:'/register',
	exact : false,
	main: () => <Register />
},
{
 	path:'/about',
 	exact : false,
	main: () => <About />
},
{
	path: '/dashboard',
	exact: false,
	main: () => <Dashboard / >
},
{
	path: '/lists',
	exact: false,
	main: () => <Lists / >
},
{
	path: '/campaigns',
	exact: false,
	main: () => <Campaigns / >
},
{
	path: '/reports',
	exact: false,
	main: () => <Reports / >
}
]

export default routes;

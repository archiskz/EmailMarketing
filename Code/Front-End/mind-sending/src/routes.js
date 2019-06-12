import React from 'react';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import Register from './pages/RegisterPage/Register';
import About from './pages/HomePage/About';
import Dashboard from './pages/DashboardPage/Dashboard';
import Automations from './pages/DashboardPage/Automations';
import Lists from './pages/DashboardPage/ListsComponent/Lists';
import Campaigns from './pages/DashboardPage/CampaignsComponent/Campaigns';
import CreateCampaign from './pages/DashboardPage/CampaignsComponent/CreateCampaigns';
import Reports from './pages/DashboardPage/Reports';
import Templates from './pages/DashboardPage/TemplatesComponent/Templates';
import Profile from './pages/ProfilePage/Profile';
import AddContact from './pages/DashboardPage/ListsComponent/AddContacts';
import CreateList from './pages/DashboardPage/ListsComponent/CreateList';
import AddContactsFile from './pages/DashboardPage/ListsComponent/AddContactsFile';
import NewTemplate from './pages/DashboardPage/TemplatesComponent/NewTemplate';
import CreateContact from './pages/DashboardPage/ContactComponent/CreateContact';

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
	path:'/register',
	exact : false,
	main: () => <Register/>
},
{
 	path:'/about',
 	exact : false,
	main: () => <About/>
},
{
	path: '/dashboard',
	exact: false,
	main: () => <Dashboard/>
},
{
	path: '/dashboard/lists',
	exact: false,
	main: () => <Lists/>
},
{
	path: '/dashboard/automations',
	exact: false,
	main: () => <Automations/>
},
{
	path: '/dashboard/campaigns',
	exact: false,
	main: () => <Campaigns/>
},
{
	path: '/create-campaign',
	exact: false,
	main: ({match}) => <CreateCampaign match ={match}/>
},
{
	path: '/dashboard/reports',
	exact: false,
	main: () => <Reports/>
},
{
	path: '/dashboard/templates',
	exact: false,
	main: () => <Templates/>
},
{
	path: '/profile',
	exact: false,
	main: () => <Profile / >
},
{
	path: '/dashboard/add-contacts',
	exact: false,
	main: () => <AddContact />
},
{
	path: '/dashboard/add-contacts-file',
	exact: false,
	main: () => <AddContactsFile />
},
{
	path: '/dashboard/create-list',
	exact: false,
	main: () => <CreateList />
},
{
	path: '/dashboard/create-contact',
	exact: false,
	main: () => <CreateList />
},
{
	path: '/new-template',
	exact: false,
	main: () => <NewTemplate />
}
]

export default routes;

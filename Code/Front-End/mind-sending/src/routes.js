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
import EditTemplate from './pages/DashboardPage/TemplatesComponent/EditTemplate';
import EditContent from './pages/DashboardPage/TemplatesComponent/EditContent';
import CreateContact from './pages/DashboardPage/ContactComponent/CreateContact';
import ViewUserProfile from './pages/DashboardPage/UserComponent/ViewUserProfile';
import ContactInformation from './pages/DashboardPage/ContactComponent/ContactInformation';
import CampaignInformation from './pages/DashboardPage/CampaignsComponent/CampaignInformation';
import EmbededForm from './pages/DashboardPage/EmbededFormComponent/EmbededForm';
import CreateAppointment from './pages/DashboardPage/AppointmentComponent/CreateAppointment';
import TestForm from './pages/DashboardPage/EmbededFormComponent/TestForm';
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
	path: '/contacts/detail',
	exact: false,
	main: () => <ContactInformation/>
},
{
	path: '/campaigns/detail',
	exact: false,
	main: () => <CampaignInformation/>
},
{
	path: '/dashboard/lists',
	exact: false,
	main: () => <Lists/>
},
{
	path: '/dashboard/embededform',
	exact: false,
	main: () => <EmbededForm/>
},
{
	path: '/create-automation',
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
	main: ({match}) => <CreateCampaign/>
},
{
	path: '/form-register',
	exact: false,
	main: () => <TestForm />
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
	path: '/dashboard/view-user-profile',
	exact: false,
	main: () => <ViewUserProfile />
},
{
	path: '/dashboard/contacts/',
	exact: false,
	main: () => <CreateContact  title={'All Contacts'} />
},

{
	path: '/new-template',
	exact: false,
	main: () => <NewTemplate />
},

{
	path: '/edit-template/:id',
	exact: false,
	main: () => <EditTemplate />
},
{
	path: '/edit-content/:id',
	exact: false,
	main: () => <EditContent />
},
{
	path: '/create-invite',
	exact: false,
	main: () => <CreateAppointment />
},

{/* {
	path: '/dashboard/contacts/:id',
	exact: false,
	main: () => <CreateContact  title={'All Contacts'} />
} */}
]

export default routes;

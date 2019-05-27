import React from 'react';
import Home from './pages/HomePage/Home';
import Login from './pages/LoginPage/Login';
import MakeCampaign from './components/MakeCampaign';
import Register from './pages/RegisterPage/Register';

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
	path:'/make-campaign',
	exact : false,
	main: () => <MakeCampaign />
},
{
	path:'/register',
	exact : false,
	main: () => <Register />
},
// {
// 	path:'/about',
// 	exact : false,
// 	main: () => <MakeCampaign />
// }
]


// class Home extends Component {
//   render(){
//      return (
//     <div className="App">
//       <Menu />
//     </div>
//   );
//   }
// }

export default routes;

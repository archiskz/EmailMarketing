import React from 'react';
import Home from './Home';
import Login from './Login';
import MakeCampaign from './MakeCampaign';

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

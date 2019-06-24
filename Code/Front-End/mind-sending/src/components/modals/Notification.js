import React, {Component} from 'react';

import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

class ListRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
         
        };
        this.addNotification = this.addNotification.bind(this);
     this.notificationDOMRef = React.createRef();
      }
      addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Update List",
          message: "Updated Success!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }

     componentDidMount(){
    
     }

      render(){
          return( 
                <ReactNotification
          types={[{
            htmlClasses: ["notification-awesome"],
            name: "awesome"
          }]}
          ref={this.notificationDOMRef}
        />
{/* END MODAAL */}
</tr>

          );
      }

}



export default withRouter(ListRow);




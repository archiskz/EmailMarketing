import React, {Component} from 'react';

import { withRouter } from "react-router";

class NewEmbededForm extends Component {
    goBack =()=>{
    this.props.history.goBack()
  }
    render() {
        
        return (<div Style={{"width":"100%","height":"auto"}}>
           
            	<div class="toolbar-css__header___WnN4N editor-css__nav-bar___1burD" data-toolbar="true">
            	<a onClick={this.goBack}
      Style={{"fontSize":"60px", "width":"120px","marginLeft":"20px","color":"white ", "cursor":"pointer","textDecoration":"none"}}>&#8249;</a>
                <nav class="toolbar-css__nav___27cII_detail">
                    
                        	 <div className="col-md-6">
                            <h3 className="embed_h3">MindSending Form Builder</h3>
                            </div>
                             
                            
                </nav>
                </div>
                
            
            </div>
        );
    }
}

export default withRouter(NewEmbededForm);

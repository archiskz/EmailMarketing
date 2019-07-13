import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class EmbededForm extends Component {
  render() {
    return (
      <div className="">
        <div className="flash_notice">
        </div>
         <div className="container" data-role="main-app-container">
         <div>
          <article>
            <header className="row">
                        <div className="col-md-6">
                            <span>
                                <h1 className="">
                                    <span className="pageTitle-css__title-heading___3H2vL">EmbededForm
                                        <span>&nbsp;</span>
                                    </span>
                                </h1>
                            </span>
                        </div>
                        
                    </header>
          </article>
            <div className="embed_signup">
        <form className="embed_signup_form">
    <div id="mc_embed_signup_scroll">
  <h2>Subscribe</h2>
<div className="indicates-required">
<span className="asterisk">*</span> indicates required</div>
<div className="mc-field-group">
  <label for="mce-EMAIL">Email Address  <span className="asterisk">*</span>
</label>
  <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL"/>
  <div for="mce-EMAIL" class="mce_inline_error">This field is required.</div>
</div>
<div className="mc-field-group">
  <label for="mce-FNAME">First Name </label>
  <input type="text" value="" name="FNAME" className="" id="mce-FNAME"/>
</div>
<div className="mc-field-group">
  <label for="mce-LNAME">Last Name </label>
  <input type="text" value="" name="LNAME" className="" id="mce-LNAME"/>
</div>

    <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button_embed_form"/></div>
    </div>
</form>

</div>
         </div>
         </div>
         <div className="section_embed">
         <h3>Copy/paste onto your site</h3>
         <form className="embed_display_form">
                    <textarea name="content" class="full-width-embed" Style="height:200px" id="embed-form-code" onclick="mojo.utils.selectAll('embed-form-code')">

                    </textarea>
                   
                    </form>
                     </div>
     </div>
    );
  }
}

export default EmbededForm;
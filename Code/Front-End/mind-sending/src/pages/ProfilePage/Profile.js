import React, {Component} from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

class Profile extends Component {
	render(){
		 return (
<div>
    <div role="main" id="content" class="content selfclear relative"> 
        <div class="lastUnit size1of1 header account"> 
            <h1>Class</h1>  
        </div> 
        
        <div class="line section" id="dijit__Templated_0" lang="en" widgetid="dijit__Templated_0">
            <div class="lastUnit size1of1">
                <h3>Profile photo</h3>
                <div class="media">
                    <fieldset class="media-image margin--lv3 !margin-top-bottom--lv0 !margin-left--lv0">
                        <div class="img-overlay inline-block-i" data-dojo-attach-point="avatar" data-src="https://secure.gravatar.com/avatar/ae9c78b2ee80429dd5bbe776e22c771a.jpg?s=300&amp;d=https%3A%2F%2Fcdn-images.mailchimp.com%2Ficons%2Fletter-avatars%2Fn.png" >
                            <a title="Edit Photo" class="edit-img hide" href="javascript:;" data-dojo-attach-point="editBtn" data-dojo-attach-event="onclick:_loadAviary"><span class="freddicon edit"></span></a>
                            <div id="uploader-status" class="loader hide" data-dojo-attach-point="uploadingStatus">
                                <img class="pulse" src="/css/icons/pulse.gif"/>
                            </div>
                        </div>
                    </fieldset>
                    <div class="media-body">
                        <h4 class="!margin--lv0">Upload your photo …</h4>
                        <p>
                            Photo should be at least 300px × 300px 
                            <span data-dojo-attach-point="removePhotoContainer" class="hide"> • <a data-dojo-attach-point="removePhoto" href="#">Remove current photo</a></span>
                        </p>
                        <form method="post" data-dojo-attach-point="avatarForm" enctype="multipart/form-data" action="/account/profile/avatar-post">
                            <span class="dijit dijitReset dijitInline dijitUploader dijitButton button button-small p0 !margin-bottom--lv2" lang="en" widgetid="uploader" >
                                <input type="file" name="avatar" aria-labelledby="uploader_label" tabindex="0" />
                                <span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:_onClick">
                                    <span class="dijitReset dijitStretch dijitButtonContents" data-dojo-attach-point="titleNode,focusNode" role="button" aria-labelledby="uploader_label" tabindex="-1" id="uploader" >
                                        <span class="dijitReset dijitInline dijitIcon dijitNoIcon" data-dojo-attach-point="iconNode">

                                        </span>
                                        <span class="dijitReset dijitToggleButtonIconChar">●</span>
                                        <span class="dijitReset dijitInline dijitButtonText" id="uploader_label" data-dojo-attach-point="containerNode">Upload Photo</span>
                                    </span>
                                </span> 
                            <input name="avatar" type="file" value="" class="dijitOffScreen" tabindex="-1" data-dojo-attach-point="valueNode"/>
                            </span>
                            <button data-dojo-attach-point="takePictureButton" class="button button-small !margin-bottom--lv2">Take a Photo!</button>
                        </form>
                    </div>
                </div>
            </div>

            <div data-dojo-attach-point="cameraContainer" class="take-picture-modal relative hide">
                <div class="video-container line">
                    <div data-dojo-attach-point="loadingContainer" class="alignc" >
                        <h2 class="section">Waiting for permission to access your webcam...</h2>
                        <img class="pulse section" src="/css/icons/pulse-dark.gif"/>
                        <p>You <em>do</em> have a webcam, right?</p>
                    </div>
                    <video data-dojo-attach-point="video" width="640" height="480" autoplay=""></video>
                    <canvas data-dojo-attach-point="canvas" width="480" height="480" class="hide"></canvas>
                </div>
                <div class="save-cancel-group absolute alignc">
                    <button class="button p0 hide" data-dojo-attach-point="savePicture">Save</button>
                    <button class="button hide" data-dojo-attach-point="retakePicture">Retake</button>
                    <button class="button p0 hide" data-dojo-attach-point="snap">Snap!</button>
                    <a href="#" data-dojo-attach-point="cancelPicture">Cancel</a>
                    <h4 data-dojo-attach-point="savingIndicator" class="hide">Lookin' good! Saving...
                        <img class="pulse" src="/css/icons/pulse-dark.gif"/>
                    </h4>
                </div>
            </div>

        </div> 
        <div class="line section"> 
            <form id="security-form" action="/account/profile/post" data-mojo-challenge="true" method="POST" novalidate="novalidate"> 
            <div class="unit size1of2 !margin-bottom--lv6"> 
                <fieldset> 
                    <h3>Basic information</h3> 
                    <div id="basicinfo-fieldset"> 
                        <div id="username-fieldset"> 
                            <div class="field-wrapper"> 
                                <label for="username" class="">Username</label> 
                                <input type="text" name="username" class=" av-text" value="hongson57" id="username"/> 
                                    <div class="field-help">This is what you use to log in to Mailchimp. You can also enter your email if you wish.
                                    </div> 
                            </div> 
                        </div> 
                        <div class="field-wrapper"> 
                            <label for="fname" class="">First name</label> 
                            <input id="fname" type="text" name="fname" class=" av-text" value="Nguyen"/> 
                        </div> 
                        <div class="field-wrapper"> 
                            <label for="lname" class="">Last name</label> 
                            <input id="lname" type="text" name="lname" class=" av-text" value="Son"/> 
                        </div> 
                        <div class="field-wrapper"> 
                            <label for="email" class="">Email address</label> 
                            <input type="email" name="email" class=" av-email" value="sonnlh57@gmail.com" id="email"/> 
                            <div class="field-help">Your email address will remain private.
                            </div> 
                        </div> 
                        <div class="field-wrapper"> 
                            <label for="url" class="">Website</label> 
                            <input type="url" name="url" class=" av-url" value="" id="url"/> 
                            <div class="field-help">Enter a full URL like http://yourdomain.com.
                            </div> 
                        </div> 
                        <span class="dijit dijitReset dijitInline dijitButton button p0" role="presentation" lang="en" widgetid="dijit_form_Button_0">
                            <span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:__onClick" role="presentation">
                                <span class="dijitReset dijitStretch dijitButtonContents" data-dojo-attach-point="titleNode,focusNode" role="button" aria-labelledby="dijit_form_Button_0_label" tabindex="0" id="dijit_form_Button_0" >
                                    <span class="dijitReset dijitInline dijitIcon dijitNoIcon" data-dojo-attach-point="iconNode">

                                    </span>
                                    <span class="dijitReset dijitToggleButtonIconChar">●</span>
                                    <span class="dijitReset dijitInline dijitButtonText" id="dijit_form_Button_0_label" data-dojo-attach-point="containerNode">Update</span>
                                </span>
                            </span>
                            <input type="submit" value="" class="dijitOffScreen" data-dojo-attach-event="onclick:_onClick" tabindex="-1" role="presentation" aria-hidden="true" data-dojo-attach-point="valueNode"/>

                        </span> 
                    </div> 
                </fieldset> 
            </div> 
            <div class="unit size1of2 !margin-bottom--lv6"> 
                <fieldset> 
                    <h3>Change password</h3> 
                    <div class="field-wrapper"> 
                        <label for="current_password" class="">Verify current password</label> 
                        <input type="password" name="current_password" autocomplete="off" maxlength="50" class=" av-password" value="" id="current_password"/> 
                    </div> 
                    <div class="field-wrapper"> 
                        <label for="password" class="">New password 
                            <span id="generate-password" class="cursor-pointer float-right small-meta">     
                                <a onclick="generatePass(this); return false;">Generate strong password</a> 
                                <a onclick="applyStrongPass(); return false;" id="usepass" > Use this password </a> 
                                <span id="strong-pass" class="strong-pass font-weight--bold">
                                </span> 
                            </span> 
                        </label> 
                        <input type="password" class="!margin-bottom--lv2  av-password" name="password" id="password" autocomplete="off" maxlength="51" value=""/>  
                        <div class="line password-requirements !margin-bottom--lv4 always-open"> 
                            <div class="group size1of2"> 
                                <ul class="small-meta selfclear"> 
                                    <li class="lowercase-char">One lowercase character</li> 
                                    <li class="uppercase-char">One uppercase character</li> 
                                    <li class="number-char">One number</li> 
                                </ul> 
                            </div> 
                            <div class="lastGroup size1of2"> 
                                <ul class="small-meta selfclear"> 
                                    <li class="special-char">One special character</li> 
                                    <li class="8-char">8 characters minimum</li> 
                                    <li class="plus-50 error">50 characters maximum</li> 
                                </ul> 
                            </div>
                        </div>  
                        <div class="feedback-block success !margin-bottom--lv4 password-ok hide" role="status">
                            <div class="lastUnit size1of1">
                                <div class="c-media">
                                    <div class="c-mediaImage v-isFreddicon">
                                        <span class="freddicon tick-circle"></span>
                                    </div>
                                    <div class="c-mediaBody--centered">
                                        <h4>Your password is secure and you're all set!</h4>
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div> 
                    <div class="field-wrapper"> 
                        <label for="confirm_password" class="">Confirm new password</label> 
                        <input type="password" name="confirm_password" autocomplete="off" maxlength="50" class=" av-password" value="" id="confirm_password"/> 
                    </div>  
                    <span class="dijit dijitReset dijitInline button p0 dijitButton dijitButtonDisabled dijitDisabled" role="presentation" lang="en" widgetid="usr-pwd-update">
                        <span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:__onClick" role="presentation">
                            <span class="dijitReset dijitStretch dijitButtonContents" data-dojo-attach-point="titleNode,focusNode" role="button" aria-labelledby="usr-pwd-update_label" tabindex="-1" id="usr-pwd-update" aria-disabled="true" >
                                <span class="dijitReset dijitInline dijitIcon dijitNoIcon" data-dojo-attach-point="iconNode">

                                </span>
                                <span class="dijitReset dijitToggleButtonIconChar">●</span>
                                <span class="dijitReset dijitInline dijitButtonText" id="usr-pwd-update_label" data-dojo-attach-point="containerNode">Update</span>
                            </span>
                        </span>
                        <input type="submit" value="" class="dijitOffScreen" data-dojo-attach-event="onclick:_onClick" tabindex="-1" role="presentation" aria-hidden="true" data-dojo-attach-point="valueNode" disabled=""/>
                    </span> 
                </fieldset> 
            </div> 
            <input type="hidden" name="__csrf_token" id="" value="26695b23b1d78d858cade3b482677afcdb952c2b" class="av-hidden"/>
        </form> 
    </div>   
    <div class="line section"> 
        <div class="lastUnit size1of1 !margin-bottom--lv6"> 
            <form action="/account/profile/accounts-post" data-mojo-challenge="true" method="POST" novalidate="novalidate"> 
                <h3>Connections and notifications</h3> 
                <p> If you're the admin or owner of an account, enable notifications to receive updates when a change is made to the account.  </p> 
                <table class="mc-table table-content-middle"> 
                    <thead> 
                    <tr class="odd"> 
                        <th>Account name</th> 
                        <th>User type</th> 
                        <th> Security notifications 
                            <span class="dijit dijitReset dijitInline dijitDropDownButton help help-tip margin--lv1 !margin-top-bottom--lv0 !margin-right--lv0 inline-block-i" lang="en" widgetid="dijit_form_DropDownButton_0">
                                <span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:__onClick" data-dojo-attach-point="_buttonNode">
                                    <span class="dijitReset dijitStretch dijitButtonContents dijitDownArrowButton" data-dojo-attach-point="focusNode,titleNode,_arrowWrapperNode,_popupStateNode" role="button" aria-haspopup="true" aria-labelledby="dijit_form_DropDownButton_0_label" tabindex="0" id="dijit_form_DropDownButton_0" >
                                        <span class="dijitReset dijitInline dijitIcon dijitNoIcon" data-dojo-attach-point="iconNode">

                                        </span>
                                        <span class="dijitReset dijitInline dijitButtonText" data-dojo-attach-point="containerNode" id="dijit_form_DropDownButton_0_label">
                                            <span class="freddicon info-circle margin--lv1 !margin-top-bottom--lv0 !margin-left--lv0"></span>
                                            <span class="valign-top">Info</span>
                                        </span>
                                        <span class="dijitReset dijitInline dijitArrowButtonInner"></span>
                                        <span class="dijitReset dijitInline dijitArrowButtonChar">▼</span>
                                    </span>
                                </span>
                                <input type="button" value="" class="dijitOffScreen" tabindex="-1" data-dojo-attach-event="onclick:_onClick" data-dojo-attach-point="valueNode" role="presentation" aria-hidden="true"/>
                            </span> 
                        </th> 
                        <th> Login notifications 
                            <span class="dijit dijitReset dijitInline dijitDropDownButton help help-tip margin--lv1 !margin-top-bottom--lv0 !margin-right--lv0 inline-block-i" lang="en" widgetid="dijit_form_DropDownButton_1"><span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:__onClick" data-dojo-attach-point="_buttonNode">
                                <span class="dijitReset dijitStretch dijitButtonContents dijitDownArrowButton" data-dojo-attach-point="focusNode,titleNode,_arrowWrapperNode,_popupStateNode" role="button" aria-haspopup="true" aria-labelledby="dijit_form_DropDownButton_1_label" tabindex="0" id="dijit_form_DropDownButton_1" >
                                    <span class="dijitReset dijitInline dijitIcon dijitNoIcon" data-dojo-attach-point="iconNode"></span>
                                    <span class="dijitReset dijitInline dijitButtonText" data-dojo-attach-point="containerNode" id="dijit_form_DropDownButton_1_label">
                                        <span class="freddicon info-circle margin--lv1 !margin-top-bottom--lv0 !margin-left--lv0"></span>
                                        <span class="valign-top">Info</span></span><span class="dijitReset dijitInline dijitArrowButtonInner"></span>
                                        <span class="dijitReset dijitInline dijitArrowButtonChar">▼</span>
                                    </span>
                                </span>
                                <input type="button" value="" class="dijitOffScreen" tabindex="-1" data-dojo-attach-event="onclick:_onClick" data-dojo-attach-point="valueNode" role="presentation" aria-hidden="true"/>
                            </span> 
                        </th> 
                        <th></th> 
                    </tr> 
                </thead> 
                <tbody>  
                    <tr class="odd"> 
                        <td>Class 
                            <span class="badge info">Current</span>
                        </td> 
                        <td>Owner</td>
                        <td> 
                            <div class="checkbox-group inline">
                                <label for="notify_0_sms"> 
                                    <div class="dijit dijitReset dijitInline dijitCheckBox av-checkbox" role="presentation" lang="en" widgetid="notify_0_sms">
                                        <input name="notify_0_notify_sms" type="checkbox" role="checkbox" aria-checked="false" class="dijitReset dijitCheckBoxInput" data-dojo-attach-point="focusNode" data-dojo-attach-event="ondijitclick:_onClick" tabindex="0" value="Y" id="notify_0_sms"  />
                                    </div> 
                                    SMS 
                                </label>
                                <label for="notify_0_email"> 
                                    <div class="dijit dijitReset dijitInline dijitCheckBox av-checkbox" role="presentation" lang="en" widgetid="notify_0_email">
                                        <input name="notify_0_notify_email" type="checkbox" role="checkbox" aria-checked="false" class="dijitReset dijitCheckBoxInput" data-dojo-attach-point="focusNode" data-dojo-attach-event="ondijitclick:_onClick" tabindex="0" value="Y" id="notify_0_email" />
                                    </div> 
                                    Email 
                                </label>
                            </div> 
                        </td>
                    <td> 
                    <div class="checkbox-group inline">
                        <label for="notify_0_logins_sms"> 
                            <div class="dijit dijitReset dijitInline dijitCheckBox av-checkbox" role="presentation" lang="en" widgetid="notify_0_logins_sms">
                                <input name="notify_0_notify_logins_sms" type="checkbox" role="checkbox" aria-checked="false" class="dijitReset dijitCheckBoxInput" data-dojo-attach-point="focusNode" data-dojo-attach-event="ondijitclick:_onClick" tabindex="0" value="Y" id="notify_0_logins_sms" />
                            </div> 
                            SMS 
                        </label>
                        <label for="notify_0_logins_email"> 
                            <div class="dijit dijitReset dijitInline dijitCheckBox av-checkbox" role="presentation" lang="en" widgetid="notify_0_logins_email">
                                <input name="notify_0_notify_logins_email" type="checkbox" role="checkbox" aria-checked="false" class="dijitReset dijitCheckBoxInput" data-dojo-attach-point="focusNode" data-dojo-attach-event="ondijitclick:_onClick" tabindex="0" value="Y" id="notify_0_logins_email" />
                            </div> 
                                Email 
                        </label>
                    </div> 
                </td>
                <td>
                <button type="button" onclick="showDeleteAccountConfirmation(116568946)" class="button cursor-pointer disabled clickable">Leave Account</button>
            </td> 
        </tr> 
    </tbody> 
</table> 
<div class="save-cancel-group"> 
    <span class="dijit dijitReset dijitInline dijitButton button p0" role="presentation" lang="en" widgetid="dijit_form_Button_1">
        <span class="dijitReset dijitInline dijitButtonNode" data-dojo-attach-event="ondijitclick:__onClick" role="presentation">
            <span class="dijitReset dijitStretch dijitButtonContents" data-dojo-attach-point="titleNode,focusNode" role="button" aria-labelledby="dijit_form_Button_1_label" tabindex="0" id="dijit_form_Button_1" >
                <span class="dijitReset dijitInline dijitIcon dijitNoIcon" data-dojo-attach-point="iconNode"></span>
                <span class="dijitReset dijitToggleButtonIconChar">●</span>
                <span class="dijitReset dijitInline dijitButtonText" id="dijit_form_Button_1_label" data-dojo-attach-point="containerNode">Update</span>
            </span>
        </span>
        <input type="submit" value="" class="dijitOffScreen" data-dojo-attach-event="onclick:_onClick" tabindex="-1" role="presentation" aria-hidden="true" data-dojo-attach-point="valueNode"/>
    </span> 
</div> 
<input type="hidden" name="__csrf_token" id="" value="26695b23b1d78d858cade3b482677afcdb952c2b" class="av-hidden"/>
</form> 
</div> 
</div>     
 </div>
</div>
  );
	}
 
}

export default Profile;



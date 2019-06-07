import React, {Component} from 'react';

class Templates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
    };
  }



	
  render(){
     return (
      
	  <div className = "" >
        <div className role="main">
          <div className="flash_notice">
          </div>
        <div className="container" data-role="main-app-container">
        <div>
  <div data-role="marketing-templates-app" className="container">
    <div className="templates-list-view listView-css__list-view___1G-eZ">
      <header className="row">
        <div className="col-md-6">
          <span>
            <h1 className>
              <span className="pageTitle-css__title-heading___3H2vL">
                Marketing Templates<span>&nbsp;</span>
              </span>
            </h1>
          </span>
          <div className="filter">
            <label className="title">Filter By</label>
            <ul className="filter-options-list">
              <li
                className="filter-option colfax-light selected"
                data-filter-option-index="All"
              >
                All
              </li>
              <li
                className="filter-option colfax-light "
                data-filter-option-index="Custom"
              >
                Custom
              </li>
              <li
                className="filter-option colfax-light "
                data-filter-option-index="SendGrid Templates"
              >
                SendGrid Templates
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6">
          <div className="pull-right">
            <a
              data-role="create-new-template"
              className="btn btn-primary"
              href="/marketing_campaigns/ui/marketing_templates/new"
            >
              Create New Template
            </a>
          </div>
        </div>
      </header>
      <div className="thumbnail-view">
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/16281fff-9e91-45c3-b27f-654b115b3435.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/16281fff-9e91-45c3-b27f-654b115b3435/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/16281fff-9e91-45c3-b27f-654b115b3435/preview">
                  Modern Holiday
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/16281fff-9e91-45c3-b27f-654b115b3435/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/16281fff-9e91-45c3-b27f-654b115b3435/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/4b9ad9cd-f991-4bf5-b171-5739189e8f32.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/4b9ad9cd-f991-4bf5-b171-5739189e8f32/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/4b9ad9cd-f991-4bf5-b171-5739189e8f32/preview">
                  Holiday Trip
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/4b9ad9cd-f991-4bf5-b171-5739189e8f32/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/4b9ad9cd-f991-4bf5-b171-5739189e8f32/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/4c28b023-ba19-4756-87b2-ea4002a056f8.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/4c28b023-ba19-4756-87b2-ea4002a056f8/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/4c28b023-ba19-4756-87b2-ea4002a056f8/preview">
                  Fun Holiday
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/4c28b023-ba19-4756-87b2-ea4002a056f8/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/4c28b023-ba19-4756-87b2-ea4002a056f8/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/5a14c44e-6335-41fb-9e9f-7512600f34ee.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/5a14c44e-6335-41fb-9e9f-7512600f34ee/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/5a14c44e-6335-41fb-9e9f-7512600f34ee/preview">
                  Song Riddle
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/5a14c44e-6335-41fb-9e9f-7512600f34ee/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/5a14c44e-6335-41fb-9e9f-7512600f34ee/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/873371b0-29a8-433b-ba1b-4e104e93adbc.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/873371b0-29a8-433b-ba1b-4e104e93adbc/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/873371b0-29a8-433b-ba1b-4e104e93adbc/preview">
                  Off Grid
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/873371b0-29a8-433b-ba1b-4e104e93adbc/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/873371b0-29a8-433b-ba1b-4e104e93adbc/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/1959b22f-5c71-4b21-9964-7851b430f4fc.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/1959b22f-5c71-4b21-9964-7851b430f4fc/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/1959b22f-5c71-4b21-9964-7851b430f4fc/preview">
                  Ingrid &amp; Anders - Welcome
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/1959b22f-5c71-4b21-9964-7851b430f4fc/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/1959b22f-5c71-4b21-9964-7851b430f4fc/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/39472a23-b055-405c-a506-fd3a6193c373.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/39472a23-b055-405c-a506-fd3a6193c373/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/39472a23-b055-405c-a506-fd3a6193c373/preview">
                  Ingrid &amp; Anders - Deal
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/39472a23-b055-405c-a506-fd3a6193c373/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/39472a23-b055-405c-a506-fd3a6193c373/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/1bc29566-0a38-4f05-abcb-55301d55fc5a.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/1bc29566-0a38-4f05-abcb-55301d55fc5a/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/1bc29566-0a38-4f05-abcb-55301d55fc5a/preview">
                  Ingrid &amp; Anders - VIP
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/1bc29566-0a38-4f05-abcb-55301d55fc5a/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/1bc29566-0a38-4f05-abcb-55301d55fc5a/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/3517f9b2-b9c7-4537-beae-573a3adc6e26.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/3517f9b2-b9c7-4537-beae-573a3adc6e26/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/3517f9b2-b9c7-4537-beae-573a3adc6e26/preview">
                  Modern
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/3517f9b2-b9c7-4537-beae-573a3adc6e26/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/3517f9b2-b9c7-4537-beae-573a3adc6e26/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/2ba5ad4a-86db-4765-9125-d6bcef2c536a.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/2ba5ad4a-86db-4765-9125-d6bcef2c536a/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/2ba5ad4a-86db-4765-9125-d6bcef2c536a/preview">
                  Coffee
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/2ba5ad4a-86db-4765-9125-d6bcef2c536a/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/2ba5ad4a-86db-4765-9125-d6bcef2c536a/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/15751f07-685e-4805-8f67-bf087072917d.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/15751f07-685e-4805-8f67-bf087072917d/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/15751f07-685e-4805-8f67-bf087072917d/preview">
                  Bloco
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/15751f07-685e-4805-8f67-bf087072917d/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/15751f07-685e-4805-8f67-bf087072917d/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/9fc1db8f-afc4-4efd-a478-3f71f19ee99b.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/9fc1db8f-afc4-4efd-a478-3f71f19ee99b/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/9fc1db8f-afc4-4efd-a478-3f71f19ee99b/preview">
                  Nurture Orange
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/9fc1db8f-afc4-4efd-a478-3f71f19ee99b/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/9fc1db8f-afc4-4efd-a478-3f71f19ee99b/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/5f246cb3-59d2-4c6f-9951-3c4d7918f339.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/5f246cb3-59d2-4c6f-9951-3c4d7918f339/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/5f246cb3-59d2-4c6f-9951-3c4d7918f339/preview">
                  Nurture
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/5f246cb3-59d2-4c6f-9951-3c4d7918f339/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/5f246cb3-59d2-4c6f-9951-3c4d7918f339/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/6b8b3f17-eb7a-4699-b36e-9443ee35aa9a.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/6b8b3f17-eb7a-4699-b36e-9443ee35aa9a/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/6b8b3f17-eb7a-4699-b36e-9443ee35aa9a/preview">
                  Classy
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/6b8b3f17-eb7a-4699-b36e-9443ee35aa9a/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/6b8b3f17-eb7a-4699-b36e-9443ee35aa9a/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/3e82dad8-d401-4f6c-847e-eef47d7b7bce.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/3e82dad8-d401-4f6c-847e-eef47d7b7bce/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/3e82dad8-d401-4f6c-847e-eef47d7b7bce/preview">
                  Tutorial
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/3e82dad8-d401-4f6c-847e-eef47d7b7bce/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/3e82dad8-d401-4f6c-847e-eef47d7b7bce/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/2e7038be-21bc-43f7-8062-2104b3a9d558.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/2e7038be-21bc-43f7-8062-2104b3a9d558/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/2e7038be-21bc-43f7-8062-2104b3a9d558/preview">
                  Underwood
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/2e7038be-21bc-43f7-8062-2104b3a9d558/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/2e7038be-21bc-43f7-8062-2104b3a9d558/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/ea4e94d8-6c49-42ff-aa88-1d5f159e00f8.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/ea4e94d8-6c49-42ff-aa88-1d5f159e00f8/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/ea4e94d8-6c49-42ff-aa88-1d5f159e00f8/preview">
                  Underwood Blue
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/ea4e94d8-6c49-42ff-aa88-1d5f159e00f8/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/ea4e94d8-6c49-42ff-aa88-1d5f159e00f8/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/61f6ded0-ce33-4a09-8186-0ff63a6a1e15.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/61f6ded0-ce33-4a09-8186-0ff63a6a1e15/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/61f6ded0-ce33-4a09-8186-0ff63a6a1e15/preview">
                  Serene
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/61f6ded0-ce33-4a09-8186-0ff63a6a1e15/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/61f6ded0-ce33-4a09-8186-0ff63a6a1e15/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/c64a2b7a-b0ee-4644-a42c-7b8ed8d40114.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/c64a2b7a-b0ee-4644-a42c-7b8ed8d40114/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/c64a2b7a-b0ee-4644-a42c-7b8ed8d40114/preview">
                  Mercado
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/c64a2b7a-b0ee-4644-a42c-7b8ed8d40114/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/c64a2b7a-b0ee-4644-a42c-7b8ed8d40114/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
        <div className="list-item-container">
          <div className="thumbnail-box">
            <div className="preview">
              <div
                className="thumbnail-container"
                style={{
                  backgroundImage:
                    'url("https://html-thumbnails-production.s3.amazonaws.com/uploads/0/thumbnails/54c7f95f-5557-49a1-8e1d-d3e2f332c3eb.png")'
                }}
              >
                <div className="thumbnail-actions">
                  <a
                    className="btn btn-secondary btn-on-dark"
                    href="/marketing_campaigns/ui/marketing_templates/54c7f95f-5557-49a1-8e1d-d3e2f332c3eb/preview"
                  >
                    Preview
                  </a>
                </div>
              </div>
            </div>
            <div className="thumbnail-details">
              <div className="template-name">
                <a href="/marketing_campaigns/ui/marketing_templates/54c7f95f-5557-49a1-8e1d-d3e2f332c3eb/preview">
                  Mercado Red
                </a>
              </div>
              <div
                className="btn-dropdown-gear btn btn-dropdown dropdown"
                data-dropdown-toggle="true"
                data-role="dropdown-toggle"
              >
                <i className="sg-icon sg-icon-gear" />
                <ul
                  className="dropdown-menu"
                  data-dropdown-menu="true"
                  data-role="dropdown-menu"
                >
                  <a
                    data-role="preview-template"
                    data-to="/marketing_campaigns/ui/marketing_templates/54c7f95f-5557-49a1-8e1d-d3e2f332c3eb/preview"
                    className="dropdown-link dropdown-link-with-icon"
                    href="/marketing_campaigns/ui/marketing_templates/54c7f95f-5557-49a1-8e1d-d3e2f332c3eb/preview"
                  >
                    <i className="sg-icon sg-icon-view" />
                    <span>Preview</span>
                  </a>
                  <a
                    data-role="create-campaign-from-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Create Campaign</span>
                  </a>
                  <a
                    data-role="duplicate-template"
                    href="javascript:void(0)"
                    className="dropdown-link dropdown-link-with-icon"
                  >
                    <i className="sg-icon sg-icon-copy" />
                    <span>Duplicate</span>
                  </a>
                </ul>
              </div>
              <div className="clearfix" />
              <div data-role="editor-type-label">
                <small>
                  <em>
                    <span>
                      <i className="paintbrush-css__icon___3qW_X" />{" "}
                      Design
                    </span>
                  </em>
                </small>
              </div>
            </div>
          </div>
          <div>
            <div className="sg-modal " data-modal="true" />
            <div className="modal-mask " />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        </div>
        </div>
    </div>
      );
  }

}
export default Templates;

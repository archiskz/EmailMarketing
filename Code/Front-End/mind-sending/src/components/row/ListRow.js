import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const ListRow = (props) =>{

     return (
        <tr className="queryRow-css__container___2FcAu infinitely-scrollable-item">
                                            
                                            
        <td className="list-name">
            <a href="/marketing_campaigns/ui/all_contacts">{props.listName}</a>
        </td>
        <td className="description">
            <span className=" ">{props.description}</span>
        </td>
        <td className="numeric">
            <span className="query-count-container">
               {props.totalContacts}
                <div className="queryCount-css__reload-tooltip___JH8R9">
                    <span data-tooltip="Refresh Contact Count" data-tooltip-pos="up" data-tooltip-length="" className="">
                        <i className="sg-icon sg-icon-reload" data-refresh-count="true"></i>
                    </span>
                </div>
            </span>
        </td>
        <td className="actions">
            <i className="sg-icon sg-icon-ellipsis"></i>
            <div className="action-icons">
                <span data-tooltip="Export" data-tooltip-pos="up" data-tooltip-length="" className="">
                    <i className="sg-icon sg-icon-export" data-role="export-global"></i>
                </span>
                <span data-tooltip="Edit" data-tooltip-pos="up" data-tooltip-length="" className="">
                    <a href="/marketing_campaigns/ui/all_contacts">
                        <i className="sg-icon sg-icon-pencil" data-role="edit-global" data-scroll-top="true"></i>
                    </a>
                </span>
                <span data-tooltip="Create Segment" data-tooltip-pos="up" data-tooltip-length="" className="">
                    <a href="/marketing_campaigns/ui/contacts/segment/0">
                        <i className="sg-icon sg-icon-segment" data-role="make-segment-global" data-scroll-top="true"></i>
                    </a>
                </span>
                <span data-tooltip="Delete All Contacts" data-tooltip-pos="up" data-tooltip-length="" className="">
                    <i className="sg-icon sg-icon-trash" data-role="delete-global"></i>
                </span>
            </div>
        </td>
    </tr>

      );

}
export default ListRow;




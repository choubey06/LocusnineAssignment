import React from 'react';
import './NavBar.css';
import logo from './../assets/Logo.svg';
import dashboard from './../assets/ico_dashboard.svg';
import users from './../assets/ico_users.svg';
import smanager from './../assets/ico_sessionmanager.svg';
import notification from './../assets/ico_notification.svg';
import user from './../assets/ico_user.svg';
import downarrow from './../assets/ico_downarrow.svg';
class NavBar extends React.Component {

    render() {
        return (
            <div className="nav">
            
            <div className="row">
              <div className="col-2.5">
              <button className="btn logo"><img src={logo} alt="Logo"/></button>
              </div>
              <div className="col-2.5">
              <button className="btn"><div className="text"><img className="icon" src={dashboard} alt="Dashboard" />&ensp;Dashboard</div></button> 
              </div>
              <div className="col-2.5">
              <button className="btn"><div className="text users"><img className="icon" src={users} alt="Users" />&ensp;Users</div></button>
              </div>
              <div className="col-2.5">
              <button className="btn"><div className="text"><img className="icon" src={smanager} alt="Session Manager" />&ensp;Session Manager</div></button>
              </div>
              <div className="col-4"></div>
              <div className="col">
              <button className="btn"><img className="icon" src={notification} alt="Notifications" /></button>
                <button className="btn"><div className="text"><img className="icon" src={user} alt="User" />{this.props.name}&ensp;Shubham Choubey</div></button>
                <button className="btn"><img src={downarrow} alt="Downarrow" /></button>
              </div>
            </div>         
            
          
          </div>
        )
    }
}
export default NavBar;
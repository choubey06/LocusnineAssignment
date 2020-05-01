import React, { Component } from 'react';
import './App.css';
import { Form, Container, Button, Alert } from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import UserList from './Components/UserList';
import NavBar from './Components/NavBar';
import Search from './Components/Search'
import users from './assets/ico_users.svg';
import close from './assets/ico_close.svg';
import modalStyle from './Components/ModalStyle.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      response: {},
      user:[],
      id: '',
      name: '',
      email: '',
      mobile: '',
      isEditUser: false,
      isopenModal: false
    }
    this.onCreate = this.onCreate.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.closeButton = this.closeButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onCreate() {
    this.setState({
      isEditUser: false,
      isopenModal: true,
      email: '',
      name: ''
    })
  }
  onEdit(user) {
    this.setState({
      isEditUser: true,
      isopenModal: true,
      
    })
    this.state.id=user;
    const getuserapiUrl = 'http://localhost:8080/getuser';
    var data = {
      "id": this.state.id
    }
    console.log("Aout to call fetch");
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(getuserapiUrl,data)
            .then(res => {
                this.setState({
                   user: res.data[0],
                    name: res.data[0].name,
                    email: res.data[0].email,
                    mobile: res.data[0].mobile
                });
                console.log(this.state.name);
            })
            .catch(function (error) {
                console.log(error);
            })

  }
  closeButton() {
    this.setState({
      isEditUser: false,
      isopenModal: false
    })
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({
      [name]: value
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    let apiUrl;

    if (this.state.isEditUser) {
      apiUrl = 'http://localhost:8080/edituser';
    } else {
      apiUrl = 'http://localhost:8080/adduser';
    }
    var roleval;
    var ele = document.getElementsByName('role');
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].checked)
        roleval = ele[i].value;
    }
    console.log(roleval);
    var data = {
      "id": this.state.id,
      "name": this.state.name,
      "email": this.state.email,
      "role": roleval,
      "mobile": this.state.mobile
    }
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(apiUrl,data)
            
            .catch(function (error) {
                console.log(error);
            });
            this.setState({
              isEditUser: false,
              isopenModal: false
            });
            window.location.reload(false);  
  }

  deleteUser(ID) {
    const apiUrl = 'http://localhost:8080/deleteuser/';
    var data = {
      "id": ID
    }
    axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    axios.post(apiUrl,data)
            
            .catch(function (error) {
                console.log(error);
            });
            this.setState({
              isEditUser: false,
              isopenModal: false
            });
            window.location.reload(false);
  }
  render() {
    let pageTitle;
    if (this.state.isEditUser) {
      pageTitle = "Edit User";
    } else {
      pageTitle = "Add User";
    }
    return (
      <div className="App">
        <NavBar />
        <div id="appBody">
          <Container>
            <div className="header">
              <div id="user">
                <img src={users} alt="Users" />   Users
              </div>

              <div id="searchbox">
                <Search />
              </div>
              <div >
                {!this.state.isEditUser && <Button id="add_button" variant="warning" onClick={this.onCreate}>+ Add User</Button>}
              </div>
            </div>
            {this.state.response.status === 'success' && <div><br /><Alert variant="info">{this.state.response.message}</Alert></div>}
            {!this.state.isEditUser && <UserList onEdit={this.onEdit} />}
            {this.state.error && <div>Error: {this.state.error.message}</div>}
            <Modal isOpen={this.state.isopenModal} style={modalStyle}>
              <div className="closeButton"><button className="btn" onClick={this.closeButton}><img src={close} alt="Close" ></img></button></div>
              <h2>{pageTitle}</h2>
              <div className="body">
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group controlId="name">
                    <Form.Control
                      type="text"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      placeholder="Name" />
                  </Form.Group>
                  <Form.Group controlId="email">
                    <Form.Control
                      type="text"
                      name="email"
                      value={this.state.email}
                      onChange={this.handleChange}
                      placeholder="Email" />
                  </Form.Group>
                  <div className="radio-group">
                    <input type="radio" name="role" value="Admin" checked /> Admin
                    <input type="radio" name="role" value="Customer Executive" />Customer Executive
                  </div>
                  <Form.Group controlId="mobile">
                    <Form.Control
                      type="text"
                      name="mobile"
                      value={this.state.mobile}
                      onChange={this.handleChange}
                      placeholder="Mobile Number (Optional)" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control type="hidden" name="email" value={this.state.email} />
                    <Button variant="warning" type="submit">{pageTitle}</Button>
              &ensp;<Button variant="danger" onClick={() => this.deleteUser(this.state.id)}>Delete User</Button>
                  </Form.Group>
                </Form>
              </div>
            </Modal>
          </Container>
        </div>
      </div >
    );
  }
}

export default App;
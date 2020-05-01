
import React from 'react';
import { Table, Alert } from 'react-bootstrap';
import edit from './../assets/ico_edit.svg';
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      users: [],
      response: {}
    }
  }

  componentDidMount() {
    const listapiUrl = 'http://localhost:8080/users';

    fetch(listapiUrl)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            users: result
          });
        },
        (error) => {
          this.setState({ error });
        }
      )
  }
  render() {
    const { error, users} = this.state;

    if(error) {
      return (
        <div>Error: {error.message}</div>
      )
    } else {
      return(
        <div>
          {this.state.response.message && <Alert variant="info">{this.state.response.message}</Alert>}
          <Table className="table-borderless table-striped">
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ROLE TYPE</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td></td>
                  <td>
                    <button value={user.id} className="btn" onClick={e => this.props.onEdit(e.currentTarget.value)}><img src={edit} alt="Edit Button" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )
    }
  }
}

export default UserList;
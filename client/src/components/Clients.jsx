import { FaTrash, FaEdit, FaEye  } from 'react-icons/fa';
import { useQuery, useMutation } from '@apollo/client';
import { GET_CLIENTS } from '../queries/clientQueries';
import { ADD_CLIENTS, DELETE_CLIENTS, UPDATE_CLIENT } from '../mutations/clientMutations'
import { useState } from 'react';
import {Projects} from './Projects'


export const Clients = () => {
  const [toEditClient, setToEditClient] = useState(null);
  const { loading, error, data } = useQuery(GET_CLIENTS);


  //edit client forms
  const [editID, setEditID] = useState('');
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');

  //add client forms
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  //view project
  const [viewProject, setViewProject] = useState('');



  
  //MUTATIONS//////////////////////////
  const [deleteClient] = useMutation(DELETE_CLIENTS, {
    //refetchQueries: [{ query: GET_CLIENTS }],
     update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });

  const [addClient] = useMutation(ADD_CLIENTS,{
    variables: {name, email, phone},
    update(cache, {data:{addClient}}){
        const {clients} = cache.readQuery({query: GET_CLIENTS})

        cache.writeQuery({
            query: GET_CLIENTS,
            data: {clients:[...clients, addClient]}
        })
    }
  })

  const [updateClient] = useMutation (UPDATE_CLIENT,{
    variables: { id: editID, name: editName, email: editEmail, phone: editPhone } 
  })

  const onSubmit = (e) =>{
    e.preventDefault();
    if (name === '' || email === '' || phone === '') {
        return alert('Please fill in all fields');
    }

    addClient(name,email,phone)
    
    setName('')
    setEmail('')
    setPhone('')
    
  }

  const toEdit = (e) =>{
    e.preventDefault();
    if (editName === '' || editEmail === '' || editPhone === '') {
        return alert('Please fill in all fields');
    }

    updateClient();

  }
  ////////////////////////////////////
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;

  return (
    <>
      <h3>Clients</h3>
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Name</td>
            <td>Email</td>
            <td>Phone</td>
            <td>Delete</td>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.phone}</td>
              <td>
                <button
                  onClick={() => {

                    deleteClient({ variables: { id: client.id } });
                  }}
                >
                  <FaTrash />
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setToEditClient(client);
                    setEditID(client.id)
                    setEditName(client.name)
                    setEditEmail(client.email)
                    setEditPhone(client.phone)
                  }}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Edit Client</h3>
      {editID && editID}
      <form onSubmit = {toEdit}>
        <label>name</label>
        <input type='text' value={editName} onChange={(e)=>setEditName(e.target.value)}>
        </input>

        <label>email</label>
        <input type='email' value = {editEmail} onChange={(e)=>setEditEmail(e.target.value)}>
        </input>

        <label>phone</label>
        <input type='text' value = {editPhone} onChange={(e)=>setEditPhone(e.target.value)}>
        </input>

        <button type='submit'>Submit</button>

      </form>
      {toEditClient && (
        <div>
          <p>Id: {toEditClient.id}</p>
          <p>Name: {toEditClient.name}</p>
          <p>Email: {toEditClient.email}</p>
          <p>Phone: {toEditClient.phone}</p>
        </div>
      )}

      <h3>Add CLient</h3>
      <form onSubmit = {onSubmit}>
        <label>name</label>
        <input type='text' value={name} onChange={(e)=>setName(e.target.value)}>
        </input>

        <label>email</label>
        <input type='email' value = {email} onChange={(e)=>setEmail(e.target.value)}>
        </input>

        <label>phone</label>
        <input type='text' value = {phone} onChange={(e)=>setPhone(e.target.value)}>
        </input>

        <button type='submit'>Submit</button>
      </form>

      <h3>View Projects</h3>
      <Projects id = {"66433f19f4b2b7e96a906ed9"}/>
    </>
  );
};

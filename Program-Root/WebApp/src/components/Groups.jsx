import '../App.css';
import {MdCreate ,  MdOutlineRemoveCircle,  } from 'react-icons/md';

function Groups({ Group, onDelete, onEdit}) {
    console.log("groupCalled")
    return (
        
        <tr className = 'Group' >
            <td>{Group.groupName}</td>
            <td>password: {Group.password} </td>
            <td>booktitle: {Group.booktitle} </td>
            <td>users: {group.users} </td>
            <td>admin: {group.admin} </td>
            <td>
                <MdCreate onClick={e => {e.preventDefault(); onEdit(Group)}}/>&nbsp;
                <MdOutlineRemoveCircle   onClick={e => {e.preventDefault(); onDelete(Group._id, Group.groupName)}}/>
            </td>
        </tr>
    );
}

export default Groups;
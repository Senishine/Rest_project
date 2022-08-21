import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectDetails = ({ projects }) => {
    let { id } = useParams();
    let filtered_items = projects.filter(it => it.id === Number.parseInt(id))
    if (filtered_items.length < 1) {
        return (<div>No such project found</div>);
    }
    const item = filtered_items[0];
    const users = item.users.map((it) => <div key={it.username}><a href={it.url}>{it.username}</a></div>);
    return (
        <div>
            <table>
                <tr>
                    <td>Name of project: </td>
                    <td>{item.name}</td>
                </tr>
                <tr>
                    <td>Url repository: </td>
                    <td>{item.repository}</td>
                </tr>
            </table>
            <header><strong>Users</strong></header>
            {users}
        </div>
    )
};

export default ProjectDetails;
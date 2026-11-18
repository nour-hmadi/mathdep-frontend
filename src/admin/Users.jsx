import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import { formatDate, time } from "./format";

// Every account on the site. The admin can deactivate an account (it can't sign in or post),
// make someone an admin, or delete an account. Nobody can do these to their own account.
const fullName = (user) => (user.first_name ? `${user.first_name} ${user.last_name}` : user.name || "");
const roleOf = (user) => (user.isAdmin ? "Admin" : user.isTeacher === true || user.type === "teacher" ? "Teacher" : "Student");
const isOff = (user) => user.isActive === false;

function Users() {
  const [users, setUsers] = useState(null);
  const [message, setMessage] = useState("");
  const me = sessionStorage.getItem("id");

  const load = () =>
    api.get("/api/user")
      .then((res) => setUsers(res.data.data))
      .catch(() => { setUsers([]); setMessage("The accounts could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const run = (request, done) =>
    request.then(() => { setMessage(done); load(); })
      .catch((err) => setMessage(err.response?.data?.message || "That didn't work. Try again."));

  const toggleActive = (user) =>
    run(api.put(`/api/user/edit/${user._id}`, { isActive: isOff(user) }),
      `${fullName(user)} ${isOff(user) ? "can sign in again" : "was deactivated: they can't sign in or post"}.`);

  const toggleAdmin = (user) => {
    if (!user.isAdmin && !window.confirm(`Make ${fullName(user)} an admin? They will be able to change everything on the site.`)) return;
    run(api.put(`/api/user/${user._id}/admin`, { isAdmin: !user.isAdmin }),
      `${fullName(user)} ${user.isAdmin ? "is no longer an admin" : "is now an admin"}.`);
  };

  const remove = (user) => {
    if (window.confirm(`Delete ${fullName(user)}'s account? This cannot be undone. To stop them signing in, use Deactivate.`))
      run(api.delete(`/api/user/${user._id}`), `${fullName(user)}'s account was deleted.`);
  };

  if (!users) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Users</h2></div>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={users}
        searchPlaceholder="Search name, email or file number…"
        empty="No accounts yet."
        columns={[
          { key: "photo", label: "Photo", sortable: false, text: () => "",
            render: (user) => <img className="data-table__photo" src={user.image?.url} alt="" /> },
          { key: "name", label: "Name", value: fullName,
            render: (user) => <>{fullName(user)}{user._id === me && <small className="data-table__you"> (you)</small>}</> },
          { key: "email", label: "Email" },
          { key: "role", label: "Role", value: roleOf, render: (user) => <span className="tag">{roleOf(user)}</span> },
          { key: "file_number", label: "File number" },
          { key: "status", label: "Status", value: (user) => (isOff(user) ? "Deactivated" : "Active"),
            render: (user) => (isOff(user)
              ? <span className="status status--off">Deactivated</span>
              : <span className="status status--on">Active</span>) },
          { key: "createdAt", label: "Joined", value: (user) => time(user.createdAt), text: (user) => formatDate(user.createdAt) },
        ]}
        filters={[
          { key: "role", label: "Role", options: [["Admin", "Admins"], ["Teacher", "Teachers"], ["Student", "Students"]],
            match: (user, value) => roleOf(user) === value },
          { key: "status", label: "Status", options: [["active", "Active"], ["off", "Deactivated"]],
            match: (user, value) => (value === "off") === isOff(user) },
        ]}
        actions={(user) => (user._id === me ? null : (
          <>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => toggleActive(user)}>
              {isOff(user) ? "Activate" : "Deactivate"}
            </button>
            <button type="button" className="admin-button admin-button--small admin-button--light" onClick={() => toggleAdmin(user)}>
              {user.isAdmin ? "Remove admin" : "Make admin"}
            </button>
            <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(user)}>Delete</button>
          </>
        ))}
      />
    </>
  );
}

export default Users;

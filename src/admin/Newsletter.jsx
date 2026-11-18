import React, { useEffect, useState } from "react";
import api from "../api";
import Loader from "../components/Loader/Loader";
import DataTable from "./DataTable";
import { formatDate, time } from "./format";

// Everyone who signed up in the footer. The site doesn't send emails itself: the admin copies the
// addresses (or downloads them as a CSV file) into their email app or a mailing service.
function Newsletter() {
  const [items, setItems] = useState(null);
  const [message, setMessage] = useState("");

  const load = () =>
    api.get("/api/subscribers")
      .then((res) => setItems(res.data.data))
      .catch(() => { setItems([]); setMessage("The list could not be loaded. Try again in a minute."); });

  useEffect(() => { load(); }, []);

  const copyAll = () =>
    navigator.clipboard.writeText(items.map((item) => item.email).join(", "))
      .then(() => setMessage(`${items.length} addresses copied. Paste them in the Bcc field of your email.`))
      .catch(() => setMessage("Copying didn't work in this browser: use Download CSV instead."));

  const downloadCsv = () => {
    const csv = ["email,signed_up", ...items.map((item) => `${item.email},${item.createdAt.slice(0, 10)}`)].join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    link.download = "newsletter-subscribers.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const remove = (item) => {
    if (window.confirm(`Remove ${item.email} from the newsletter?`))
      api.delete(`/api/subscribers/${item._id}`).then(() => { setMessage(`${item.email} was removed.`); load(); });
  };

  if (!items) return <Loader />;

  return (
    <>
      <div className="admin-head"><h2>Newsletter</h2></div>
      <p className="admin-form__hint">Use Bcc when you email the list, so subscribers don't see each other's addresses.</p>
      {message && <p className="admin-message" role="status">{message}</p>}
      <DataTable
        rows={items}
        searchPlaceholder="Search emails…"
        empty="Nobody has signed up yet."
        columns={[
          { key: "email", label: "Email" },
          { key: "createdAt", label: "Signed up", value: (item) => time(item.createdAt), text: (item) => formatDate(item.createdAt) },
        ]}
        toolbar={items.length > 0 && (
          <>
            <button type="button" className="admin-button admin-button--light" onClick={copyAll}>Copy all</button>
            <button type="button" className="admin-button" onClick={downloadCsv}>Download CSV</button>
          </>
        )}
        actions={(item) => (
          <button type="button" className="admin-button admin-button--small admin-button--danger" onClick={() => remove(item)}>Remove</button>
        )}
      />
    </>
  );
}

export default Newsletter;

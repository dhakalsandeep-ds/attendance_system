import React, { useEffect, useState } from "react";
// import Table from "../../components/Table";
import { useAuth } from "../../context/auth";

const StudentView = () => {
  let [loading, setLoading] = useState(true);
  let [student, setStudent] = useState([]);
  let user = useAuth();

  async function fetchBatch() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch("http://localhost:8000/admin/student", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);

    setStudent(data.result);
    setLoading(false);
  }

  useEffect(() => {
    fetchBatch();
  }, []);
  return (
    <div>
      <button onClick={user.logout}>logout</button>
      {/* {loading && <p>loading.......</p>}
      {loading === false && <Table> </Table>} */}
      student view
    </div>
  );
};

export default StudentView;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import Table from "../components/Table";

const TeacherView = () => {
  let [loading, setLoading] = useState(true);
  let [teacher, setTeacher] = useState([]);
  let user = useAuth();

  async function fetchTeacher() {
    let headersList = {
      "Content-type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let response = await fetch("http://localhost:8000/admin/teacher", {
      method: "GET",
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);

    setTeacher(data.result);
    setLoading(false);
  }

  useEffect(() => {
    fetchTeacher();
  }, []);
  return (
    <div>
      {loading && <p>loading.......</p>}
      {loading === false && <Table> </Table>}
    </div>
  );
};

export default TeacherView;

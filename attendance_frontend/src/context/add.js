import React from "react";
import { useAuth } from "./auth";

const useAdd = ({ url, body }) => {
  const user = useAuth();

  async function add(body) {
    let headersList = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user.token()}`,
    };

    let bodyContent = JSON.stringify(body);

    let response = await fetch(url, {
      method: "POST",
      body: bodyContent,
      headers: headersList,
    });

    let data = await response.json();
    console.log(data);
    return data;
  }
  return [add];
};

async function add(body) {
  let headersList = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token()}`,
  };

  let bodyContent = JSON.stringify(body);

  let response = await fetch("http://localhost:8000/admin/student", {
    method: "POST",
    body: bodyContent,
    headers: headersList,
  });

  let data = await response.json();
  console.log(data);
  return data;
}

export default useAdd;

import { OwnID } from "@ownid/react";
import { useRef, useState } from "react";
import { Login } from "./Login";
export default function RegisterComponent() {
  const emailField = useRef(null);

  const [ownIdData, setOwnIdData] = useState(null);

  // Stores ownIdData
  function onRegister(ownIdData) {
    console.log("ownIdDat", ownIdData);
    console.log("ownIdData", ownIdData);
    setOwnIdData(ownIdData.data);
  }

  async function onSubmit(event) {
    event.preventDefault();
    const userData = {
      loginId: emailField.current.value,

      ownIdData: ownIdData,
    };
    const response = await fetch(
      "https://f933-103-148-23-182.ngrok-free.app/setOwnIDDataByLoginId",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    console.log("response", response);
    const data = await response.json();
    console.log(data, "data........");
    if (data.created) {
      console.log("created successfully");
    } else {
      console.log("something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} style={{ padding: "100px" }}>
      <input ref={emailField} type="email" name="email" />

      <button type="submit">Register</button>
      <OwnID
        type="register"
        options={{ variant: "button-faceid", infoTooltip: true }}
        loginIdField={emailField}
        onError={(error) => {
          console.log(error, "error");
        }}
        onRegister={onRegister}
      />
      <h1>login</h1>
      <Login></Login>
    </form>
  );
}

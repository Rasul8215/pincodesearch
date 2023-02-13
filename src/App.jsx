// auto populate state and district field based on pincode
// 1. pincode
// 2. district
// 3. state
import { useEffect, useState } from "react";
function App() {
  const [pincode, setPincode] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  const fetchData = () => {
    if (pincode.length === 6) {
      fetch(`https://api.postalpincode.in/pincode/${pincode}`)
        .then((data) => data.json())
        .then((data) => {
          if (data[0].Status === "Success") {
            setDistrict(data[0].PostOffice[0].District);
            setState(data[0].PostOffice[0].State);
          } else {
            alert("No data Found");
          }
        });
    } else {
      setDistrict("");
      setState("");
    }
  };

  useEffect(fetchData, [pincode]);

  return (
    <div className="flex flex-col w-[500px] m-auto mt-10 items-center justify-center gap-4">
      <input
        type="number"
        onChange={(e) => {
          setPincode(e.target.value);
        }}
        value={pincode}
        className="p-2 border-2 rounded shadow-md"
        placeholder="pincode"
      />
      <div className="flex gap-4">
        <input
          onChange={(e) => {
            setDistrict(e.target.value);
          }}
          value={district}
          className="p-2 border-2 rounded shadow-md"
          placeholder="district"
        />
        <input
          onChange={(e) => {
            setState(e.target.value);
          }}
          value={state}
          className="p-2 border-2 rounded shadow-md"
          placeholder="state"
        />
      </div>
    </div>
  );
}

export default App;
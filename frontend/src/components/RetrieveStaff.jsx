import React, { useState } from "react";
import { retrieveStaff } from "../services/staffService";

const RetrieveStaff = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState("");

  const handleRetrieve = async () => {
    try {
      const response = await retrieveStaff(employeeNumber);
      setStaff(response);
      setError("");
    } catch (err) {
      setError("Failed to retrieve staff");
      setStaff(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Employee Number (optional)"
        value={employeeNumber}
        onChange={(e) => setEmployeeNumber(e.target.value)}
      />
      <button onClick={handleRetrieve}>Retrieve Staff</button>

      {error && <p>{error}</p>}
      {staff && (
        <div>
          {Array.isArray(staff) ? (
            staff.map((s) => (
              <div key={s.employeeNumber}>
                <p>
                  {s.surname} {s.otherNames}
                </p>
                <p>Employee Number: {s.employeeNumber}</p>
              </div>
            ))
          ) : (
            <div>
              <p>
                {staff.surname} {staff.otherNames}
              </p>
              <p>Employee Number: {staff.employeeNumber}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RetrieveStaff;

import React, { useState } from "react";
import { retrieveStaff } from "../services/staffService";

const RetrieveStaff = () => {
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [staff, setStaff] = useState(null);
  const [error, setError] = useState("");

  const handleRetrieve = async () => {
    try {
      const response = await retrieveStaff(employeeNumber.trim()); // Trim to remove white spaces from both ends of string
      setStaff(response);
      setError("");
    } catch (err) {
      console.log("Error retrieving staff:", err);
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

                {/* Display Base64 image */}
                {s.idPhoto && (
                  <img
                    src={`data:image/jpeg;base64,${s.idPhoto}`} // Adjust MIME type as needed (image/png, etc.)
                    alt="Staff ID"
                    style={
                      {
                        /*   width: "500px",
                      height: "500px",
                      objectFit: "contain", */
                      }
                    }
                  />
                )}
              </div>
            ))
          ) : (
            <div>
              <p>
                {staff.surname} {staff.otherNames}
              </p>
              <p>Employee Number: {staff.employeeNumber}</p>

              {/* Display Base64 image */}
              {staff.idPhoto && (
                <img
                  src={`data:image/jpeg;base64,${staff.idPhoto}`} // Adjust MIME type as needed
                  alt="Staff ID"
                  style={{ width: "150px", height: "150px" }}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RetrieveStaff;

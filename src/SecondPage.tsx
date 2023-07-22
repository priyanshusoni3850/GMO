
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Interface for department and sub-department data
interface Department {
  id: number;
  name: string;
  subDepartments: SubDepartment[];
}

interface SubDepartment {
  id: number;
  name: string;
}

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<number[]>([]);
  const [data, setData] = useState<any[]>([]); // State to store the fetched data

  // Sample JSON data (You can also fetch it from an API)
  const sampleDepartments: Department[] = [
          {
         id: 1,
            name: "customer_service",
            subDepartments: [
              { id: 1, name: "support" },
              {id : 2, name: "customer_success" },
            ],
          },
          {
            id: 2,
            name: "design",
            subDepartments: [
              { id: 3, name: "graphic_design" },
              { id: 4, name: "product_design" },
              { id: 5, name: "web_design" },
            ],
          },
        ];
        
        

  useEffect(() => {
    // You can replace the following line with the API call to fetch department data
    setDepartments(sampleDepartments);

    // Fetch data from the API and update the "data" state
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        // Assuming that the fetched data is an array of objects and has 'id', 'title', and 'body' properties
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const handleDepartmentSelect = (department: Department) => {
    if (selectedDepartments.includes(department.id)) {
      // If selected, remove it from the selection
      setSelectedDepartments((prevSelected) => prevSelected.filter((id) => id !== department.id));
      // Also remove all sub-departments from the selection
      setSelectedSubDepartments((prevSelected) =>
        prevSelected.filter((id) => !department.subDepartments.map((subDept) => subDept.id).includes(id))
      );
    } else {
      // If not selected, add it to the selection
      setSelectedDepartments((prevSelected) => [...prevSelected, department.id]);
      // Also add all sub-departments to the selection
      setSelectedSubDepartments((prevSelected) =>
        [...prevSelected, ...department.subDepartments.map((subDept) => subDept.id)]
      );
    }
  };

  const handleSubDepartmentSelect = (subDepartment: SubDepartment) => {
    if (selectedSubDepartments.includes(subDepartment.id)) {
      // If selected, remove it from the selection
      setSelectedSubDepartments((prevSelected) => prevSelected.filter((id) => id !== subDepartment.id));
      // Check if all sub-departments of the parent department are selected
      const parentDepartment = departments.find((dept) =>
        dept.subDepartments.map((subDept) => subDept.id).includes(subDepartment.id)
      );
      if (parentDepartment && parentDepartment.subDepartments.every((subDept) => selectedSubDepartments.includes(subDept.id))) {
        // If all sub-departments of the parent department are selected, remove the parent department from the selection
        setSelectedDepartments((prevSelected) => prevSelected.filter((id) => id !== parentDepartment.id));
      }
    } else {
      // If not selected, add it to the selection
      setSelectedSubDepartments((prevSelected) => [...prevSelected, subDepartment.id]);
      // Check if all sub-departments of the parent department are selected
      const parentDepartment = departments.find((dept) =>
        dept.subDepartments.map((subDept) => subDept.id).includes(subDepartment.id)
      );
      if (parentDepartment && parentDepartment.subDepartments.every((subDept) => selectedSubDepartments.includes(subDept.id))) {
        // If all sub-departments of the parent department are selected, add the parent department to the selection
        setSelectedDepartments((prevSelected) => [...prevSelected, parentDepartment.id]);
      }
    }
  };

  

  
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 100 },
      { field: 'title', headerName: 'Title', width: 300 },
      { field: 'body', headerName: 'Body', width: 600 },
    ];
  
    // Example usage of useNavigate hook for navigation
    const handleGoBack = () => {
      navigate(-1); // Navigates back to the previous page
    };
  
    return (
      <div>
        <h2>List of Departments and Sub-Departments</h2>
        {departments.map((department) => (
          <div key={department.id}>
            {/* Department */}
            <div
              onClick={() => handleDepartmentSelect(department)}
              style={{
                fontWeight: selectedDepartments.includes(department.id) ? 'bold' : 'normal',
              }}
            >
              {department.name}
            </div>
            {/* Sub-Departments */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                Sub-Departments
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {department.subDepartments.map((subDepartment) => (
                    <div
                      key={subDepartment.id}
                      onClick={() => handleSubDepartmentSelect(subDepartment)}
                      style={{
                        paddingLeft: 20,
                        fontWeight: selectedSubDepartments.includes(subDepartment.id) ? 'bold' : 'normal',
                      }}
                    >
                      - {subDepartment.name}
                    </div>
                  ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
        <h2>Data Grid</h2>
        <div style={{ height: 400, width: '100%' }}>
          {/* Use the "data" state to populate the rows in the DataGrid */}
          <DataGrid rows={data} columns={columns} />
        </div>
  
        {/* Example button to go back */}
        <button onClick={handleGoBack}>Go Back</button>
      </div>
    );
  };
  
  export default SecondPage;
  
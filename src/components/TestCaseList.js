import React, { useState, useEffect, useMemo, useRef } from "react";
import TestCaseDataService from "../services/TestCaseService";
import { useTable } from "react-table";

const TestCasesList = (props) => {
  const [testcases, setTestCases] = useState([]);
  const [searchTestCase, setSearchTestCase] = useState("");
  const testcasesRef = useRef();

  testcasesRef.current = testcases;

  useEffect(() => {
    retrieveTestCases();
  }, []);

  const onChangeSearchTestCase = (e) => {
    const searchTestCase = e.target.value;
    setSearchTestCase(searchTestCase);
  };

  const retrieveTestCases = () => {
    TestCaseDataService.getAll()
      .then((response) => {
        setTestCases(response.data);
        
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTestCases();
  };

  const removeAllTestCases = () => {
    TestCaseDataService.removeAll()
      .then((response) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const findByTestCase = () => {
    TestCaseDataService.findByStatus(searchTestCase)
      .then((response) => {
        
        setTestCases(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const openTestCase = (rowIndex) => {
    const id = testcasesRef.current[rowIndex].id;

    props.history.push("/testcases/" + id);
  };

  const deleteTestCase = (rowIndex) => {
    const id = testcasesRef.current[rowIndex].id;

    TestCaseDataService.remove(id)
      .then((response) => {
        props.history.push("/testcases");

        let newTestCases = [...testcasesRef.current];
        newTestCases.splice(rowIndex, 1);

        setTestCases(newTestCases);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Module",
        accessor: "module",
      },
      {
        Header: "Screen",
        accessor: "screenName",
      },
      {
        Header: "TestCaseName",
        accessor: "name",
      },
      {
        Header: "Description",
        accessor: "description",
      },{
        Header: "TestCaseType",
        accessor: "type",
      },
      {
        Header: "Status",
        accessor: "status",
        
      },{
        Header: "Comments",
        accessor: "comments",
        
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: (props) => {
          const rowIdx = props.row.id;
          return (
            <div>
              <span onClick={() => openTestCase(rowIdx)}>
                <i className="far fa-edit action mr-2"></i>
              </span>

              <span onClick={() => deleteTestCase(rowIdx)}>
                <i className="fas fa-trash action"></i>
              </span>
            </div>
          );
        },
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: testcases,
  });

  return (

    <div className="list row">
      
      <div className="form-group">
            <label htmlFor="title">Test Case Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value=""
              onChange=""
              name="name"
            />
          </div><div>&nbsp;</div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value=""
              onChange=""
              name="description"
            />
          </div>
      

      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by TestCase Status"
            value={searchTestCase}
            onChange={onChangeSearchTestCase}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTestCase}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-12 list">
        <table
          className="table table-striped table-bordered"
          {...getTableProps()}
        >
          <thead style={{backgroundColor: "#FFA500",color:'white'}}>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="col-md-8">
        <button className="btn btn-sm btn-danger" onClick={removeAllTestCases}>
          Remove All
        </button>
      </div>
    </div>
  );
};

export default TestCasesList;

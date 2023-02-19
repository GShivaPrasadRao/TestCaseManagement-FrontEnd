import React, { useState } from "react";
import TestCaseDataService from "../services/TestCaseService";

const AddTestCase = () => {
  const initialTestCaseState = {
    id: null,
    module:"",
    screenName: "",
    description: "",
    type : "",
    status : "",
    comments: ""
  };
  const [testcase, setTestCase] = useState(initialTestCaseState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setTestCase({ ...testcase, [name]: value });
  };

  //Save test case
  const saveTestCase = () => {
    var data = {
      module : testcase.module,
      screenName: testcase.screenName,
      name : testcase.name,
      description: testcase.description,
      type : testcase.type,
      status: testcase.status,
      comments: testcase.comments
    };

    TestCaseDataService.create(data)
      .then(response => {
        setTestCase({
          id: response.data.id,
          module : response.data.module,
          screenName: response.data.screenName,
          name : response.data.name,
          description: response.data.description,
          type : response.data.type,
          status : response.data.status,
          comments: response.data.comments
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newTestCase = () => {
    setTestCase(initialTestCaseState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTestCase}>
            Add
          </button>
        </div>
      ) : (
        <div>

          <div className="form-group">
            <label htmlFor="type">ModuleType</label>
            <input
              type="text"
              className="form-control"
              id="module"
              required
              value={testcase.module}
              onChange={handleInputChange}
              name="module"
            />
          </div>    


          <div className="form-group">
            <label htmlFor="screenName">Screen</label>
            <input
              type="text"
              className="form-control"
              id="screenName"
              required
              value={testcase.screenName}
              onChange={handleInputChange}
              name="screenName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">TestCaseName</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={testcase.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>    
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={testcase.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={testcase.type}
              onChange={handleInputChange}
              name="type"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" >Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={testcase.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Comments</label>
            <input
              type="text"
              className="form-control"
              id="comments"
              required
              value={testcase.comments}
              onChange={handleInputChange}
              name="comments"
            />
          </div>

          

          <button onClick={saveTestCase} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTestCase;

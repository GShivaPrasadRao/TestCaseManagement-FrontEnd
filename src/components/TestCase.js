import React, { useState, useEffect } from "react";
import TestCaseDataService from "../services/TestCaseService";

const TestCase = props => {
  const initialTestCaseState = {
    id: null,
    module:"",
    screenName: "",
    description: "",
    type : "",
    status : "",
    comments: ""
  };
  const [currentTestCase, setCurrentTestCase] = useState(initialTestCaseState);
  const [message, setMessage] = useState("");

  const getTestCase = id => {
    TestCaseDataService.get(id)
      .then(response => {
        setCurrentTestCase(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTestCase(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentTestCase({ ...currentTestCase, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentTestCase.id,
      module : currentTestCase.module,
      screenName: currentTestCase.screenName,
      name : currentTestCase.name,
      description: currentTestCase.description,
      type : currentTestCase.type,
      status: currentTestCase.status,
      comments: currentTestCase.comments
    };

    TestCaseDataService.update(currentTestCase.id, data)
      .then(response => {
        setCurrentTestCase({ ...currentTestCase, published: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateTestCase = () => {
    TestCaseDataService.update(currentTestCase.id, currentTestCase)
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteTestCase = () => {
    TestCaseDataService.remove(currentTestCase.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/testcases");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentTestCase ? (
        <div className="edit-form">
          <h4>TestCase</h4>
          <form>

          <div className="form-group">
            <label htmlFor="type">ModuleType</label>
            <input
              type="text"
              className="form-control"
              id="module"
              required
              value={currentTestCase.module}
              onChange={handleInputChange}
              name="module"
            />
          </div>   

            <div className="form-group">
              <label htmlFor="screenName">Screen Name</label>
              <input
                type="text"
                className="form-control"
                id="screenName"
                name="screenName"
                value={currentTestCase.screenName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <label htmlFor="type">TestCaseName</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={currentTestCase.name}
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
                name="description"
                value={currentTestCase.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
            <label htmlFor="description">Type</label>
            <input
              type="text"
              className="form-control"
              id="type"
              required
              value={currentTestCase.type}
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
              value={currentTestCase.status}
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
              value={currentTestCase.comments}
              onChange={handleInputChange}
              name="comments"
            />
          </div>

            {/* <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTestCase.published ? "Published" : "Pending"}
            </div> */}
          </form>

          

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateTestCase}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a TestCase...</p>
        </div>
      )}
    </div>
  );
};

export default TestCase;

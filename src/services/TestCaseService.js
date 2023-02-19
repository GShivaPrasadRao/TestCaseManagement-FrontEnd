import http from "../http-common";

const getAll = () => {
 
  return http.get("/testcases");
};

const get = (id) => {
  return http.get(`/testcases/id/${id}`);
};

const create = (data) => {
  return http.post("/testcases", data);
};

const update = (id, data) => {
  return http.put(`/testcases/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/testcases/id/${id}`);
};

const removeAll = () => {
  return http.delete(`/testcases`);
};

const findByStatus = (status) => {
  return http.get(`/testcases/status/${status}`);
};

const TestCaseService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByStatus,
};

export default TestCaseService;

import './App.css';
import React, {useState, useEffect} from 'react';
import {Navigate, Routes, Route, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";

import NavBar from './Navbar';
import HomePage from './HomePage';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import JoblyApi from './api';
import NotFound from './NotFound';
import useLocalStorageState from './hooks/useLocalStorage';
import UserContext from './UserContext';

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [companies, setCompanies] = useState([])
  const [jobs, setJobs] = useState([])
  const [token, setToken] = useLocalStorageState('token', '')
  const [currUser, setCurrUser] = useLocalStorageState('currUser', [])
  const navigate = useNavigate();

  useEffect(() => {
    async function getDetails() {
      let companies = await JoblyApi.getAllCompanies();
      let jobs = await JoblyApi.getAllJobs();
      setCompanies(companies);
      setJobs(jobs)
      setIsLoading(false);
    }
    getDetails();
  }, []);

  const updateCompaniesList = async (formData) => {
    const name = formData.name;
    const res = await JoblyApi.getAllCompanies(name);

    setCompanies(res);
  }

  const getUserInfo = async (username) => {
    const userInfo = await JoblyApi.getUserInfo(username);
    return userInfo.user;
  }

  const doLogin = async (data) => {
    const res = await JoblyApi.login(data);
    const decoded = jwtDecode(res.token);
    await JoblyApi.setToken(res.token);
    setToken(res.token);

    const user = await getUserInfo(decoded.username);
    setCurrUser(user);
  }


  const doSignUp = async (data) => {
    const res = await JoblyApi.register({...data});
    await JoblyApi.setToken(res.token);
    setToken(res.token);
    
    setCurrUser({username: data.username, 
                 firstName: data.firstName, 
                 lastName: data.lastName,
                 email: data.email, 
                 applications: []});
  }

  const doLogout = () => {
    setCurrUser([]);
    setToken('');
  }

  const updateUserInfo = async ( data) => {
    const res = await JoblyApi.updateUserInfo(currUser.username, data)
    setCurrUser({...res.user, applications: currUser.applications})
  }

  const applyToJob = async (jobId) => {
    const res = await JoblyApi.applyToJob(currUser.username, jobId, 'post')
    setCurrUser({...currUser, applications:[...currUser.applications, jobId]})
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <>
    <UserContext.Provider value={currUser}>
    <NavBar doLogout={doLogout} /> 

    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/companies' element={<Companies companies={companies} updateCompaniesList={updateCompaniesList} />} />
      <Route path='/companies/:companyHandle' element={<Company companies={companies} jobs={jobs} applyToJob={applyToJob}/>} />
      <Route path='/jobs' element={<Jobs jobs={jobs} applyToJob={applyToJob}/>} />
      <Route path='/login' element={<Login doLogin={doLogin}/>} />
      <Route path='/signup' element={<Signup doSignUp={doSignUp}/>} />
      <Route path='/profile' element={<Profile updateUserInfo={updateUserInfo}/>} />

      <Route path='*' element={<NotFound />} />
    </Routes>
    </UserContext.Provider>
    </>
  );
}

export default App;
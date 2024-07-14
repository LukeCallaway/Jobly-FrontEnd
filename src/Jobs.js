import React, {useContext} from "react";
import {ListGroup, ListGroupItem} from 'reactstrap'

import JobCard from "./JobCard";
import UserContext from "./UserContext";
import { Navigate } from "react-router-dom";
import './Jobs.css'

function Jobs({jobs, applyToJob}) {
  const currUser = useContext(UserContext)
  if(!currUser.username) return <Navigate to='/' />

  return (
    <section>
      <div className='list-group-jobs'>
      <div className='list-group-item-jobs'>
      {jobs ? jobs.map(job => 

        <JobCard className='job-card'
          title={job.title}
          salary={job.salary}
          equity={job.equity}
          companyHandle={job.companyHandle}
          key={job.id}
          jobId={job.id}
          applyToJob={applyToJob}
          currUser={currUser}
        />

      )
      : <p>No jobs found</p>}
      </div>
      </div>
    </section>
  );
}

export default Jobs;
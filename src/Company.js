import React, {useContext} from "react";
import { Navigate, useParams } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import JobCard from "./JobCard";
import UserContext from "./UserContext";

function Company({companies, jobs, applyToJob}) {
  const { companyHandle } = useParams();
  const currUser = useContext(UserContext)
  const foundCompany = companies.find(comp => comp.handle === companyHandle);

  if(!currUser.username) return <Navigate to='/' />
  if (!foundCompany) return <Navigate to='/companies' />;

  const foundJobs = []
  jobs.forEach(job => {if(job.companyHandle === companyHandle) foundJobs.push(job)})
  return (
    <section>
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            {foundCompany.name}
          </CardTitle>
          <CardText className="font-italic">{foundCompany.description}</CardText>
        </CardBody>
      </Card>
      {foundJobs ? foundJobs.map(job => 
        <JobCard 
          title={job.title} 
          salary={job.salary}
          equity={job.equity} 
          key={job.id}
          jobId={job.id}
          applyToJob={applyToJob}
          currUser={currUser}
        />
      )
      : <p>No jobs found for {foundCompany.name}</p>}
      
    </section>
  );
}

export default Company;
import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";


function JobCard({title, salary, equity, companyHandle, jobId, applyToJob, currUser}) {

  return (
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <h1>{title}</h1>
            <h2>{companyHandle}</h2>
          </CardTitle>
          <CardText className="font-italic">
            <b>Salary :</b> {salary ? salary : 0}
            <br></br>
            <b>Equity :</b> {equity ? equity : 0}
            <br></br>
            {currUser.applications.includes(jobId) ? 'Applied' : 
              <button onClick={() => applyToJob(jobId)}>
                Apply
              </button>}
            
          </CardText>
          
        </CardBody>
      </Card>
  );
}

export default JobCard;
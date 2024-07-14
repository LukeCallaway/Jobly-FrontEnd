import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";


function CompanyCard({name, description}) {
  return (
      <Card>
        <CardBody>
          <CardTitle className="font-weight-bold text-center">
            <h1>{name}</h1>
          </CardTitle>
          <CardText className="font-italic">
            {description}
          </CardText>
        </CardBody>
      </Card>
  );
}

export default CompanyCard;
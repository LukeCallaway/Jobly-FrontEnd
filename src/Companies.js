import React , {useContext} from "react";
import {Link, Navigate} from 'react-router-dom'
import {ListGroup, ListGroupItem} from 'reactstrap'

import SearchCompaniesForm from './SearchCompaniesForm'
import CompanyCard from "./CompanyCard";
import UserContext from "./UserContext";
import './Companies.css'

function Companies({companies, updateCompaniesList}) {
  const currUser = useContext(UserContext)
  if(!currUser.username) return <Navigate to='/' />

  return (
    <section>
      <SearchCompaniesForm updateCompaniesList={updateCompaniesList}/>
      <ListGroup>

      {companies ? companies.map(company => 

      <Link style={{ textDecoration: 'none' }} to={`/companies/${company.handle}`}>
        <ListGroupItem>
          <div col></div>
        <CompanyCard 
          name={company.name} 
          description={company.description} 
          key={company.handle}
        />
      </ ListGroupItem>
      </Link>
      )
      : <p>No Companies found</p>}

      </ListGroup>
    </section>
  );
}

export default Companies;
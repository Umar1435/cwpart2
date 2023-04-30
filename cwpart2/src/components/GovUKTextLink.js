import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as GovUKLink } from 'govuk-react';

const GovUKTextLink = ({ to, children }) => {
    return (
        <RouterLink to={to} style={{ textDecoration: 'none' }}>
            <GovUKLink>{children}</GovUKLink>
        </RouterLink>
    );
};

export default GovUKTextLink;
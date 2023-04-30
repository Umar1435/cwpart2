import Button from '@govuk-react/button';
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const GovUKButtonNavigate = ({ to, children }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return <Button onClick={handleClick}>{children}</Button>;
};

export default GovUKButtonNavigate;
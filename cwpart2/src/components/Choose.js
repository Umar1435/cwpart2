import TopNav from '@govuk-react/top-nav';
import Heading from '@govuk-react/heading';
import Button from '@govuk-react/button';
import Footer from '@govuk-react/footer';
import Select from '@govuk-react/select';
import './Style.css';
import React, { useState, useEffect, useCallback } from 'react';


import { Label } from '@govuk-react/label';
import Input from '@govuk-react/input';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GovUKButtonNavigate from './GovUKButtonNavigate';
import GovUKTextLink from './GovUKTextLink';

import { useNavigate} from 'react-router-dom';





function Choose () {

    

    const Home = () => {
        return (
            <div>

                <TopNav />
                <Heading  > GP Registration </Heading>
                

                <fieldset>
                    <h1>Register Online</h1>
                    <h4>It usually takes about 5 minutes.</h4>
                    <GovUKButtonNavigate to="/register" >Start Now </GovUKButtonNavigate>
                    <h4>do you want to de-register? <GovUKTextLink to="/de-register">Click here</GovUKTextLink></h4>
                    <h2>OR</h2>
                    <h4>If you are registered already.</h4>
                    <GovUKButtonNavigate to="/sign-in" >Sign In </GovUKButtonNavigate>
                </fieldset>

                <Footer />
            </div>
        );
    };


    const Dashboard = () => {
        return (
            <div>
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard!</p>
                <u><GovUKTextLink to="/"><span>&#8592;</span>Back</GovUKTextLink></u>
            </div>
        );
    };

    const SignIn = () => {
        const [selectedOption, setSelectedOption] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [surname, setSurname] = useState('');
        const [postcode, setPostcode] = useState('');
        const [nhsNumber, setNhsNumber] = useState('');
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);

        const navigate = useNavigate();

        const handleSubmit = async (event) => {
            event.preventDefault();
            setErrors(validate());
            setIsSubmitting(true);
        };

        const submitForm = useCallback(async () => {

            const data = {
                userType: selectedOption,
                username: selectedOption === 'option1' ? firstName : username,
                password: selectedOption === 'option1' ? surname : password,
                firstName,
                surname,
                postcode,
                nhsNumber,
            };

            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);

            const response = await fetch('http://localhost:4000/login.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (result.status === 'success') {
                navigate('/dashboard');
            } else {
                alert(result.message);
            }
        }, [firstName, surname, postcode, nhsNumber, username, password, navigate]);

        useEffect(() => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                submitForm();
                setIsSubmitting(false);
            }
        }, [errors, isSubmitting, submitForm]);

        const validate = () => {
            let errors = {};

            if (!username) {
                errors.username = "Username is required";
            }

            if (!password) {
                errors.password = "Password is required";
            }

            if (!firstName) {
                errors.firstName = "First name is required";
            }

            if (!surname) {
                errors.surname = "Surname is required";
            }

            if (!postcode) {
                errors.postcode = "Postcode name is required";
            }

            if (!nhsNumber) {
                errors.nhsNumber = "NHS number is required";
            } else if (!/^\d{10}$/.test(nhsNumber)) {
                errors.nhsNumber = "NHS number must be a 10-digit integer";
            }

            return errors;
        };
        


        

        return (
            <div>

                <TopNav serviceTitle="Sign In" />
                <u><GovUKTextLink to="/"><span>&#8592;</span>Back</GovUKTextLink></u>

                <fieldset>
                    <form onSubmit={handleSubmit}>
                        <Label htmlFor="userType"><h2>User Type</h2></Label>
                        <Select
                            id="userType"
                            name="userType"
                            value={selectedOption}
                            onChange={(e) => setSelectedOption(e.target.value)}
                        >
                            
                            <option value="option1">Patients</option>
                            <option value="option2">Doctors</option>
                            <option value="option3">Receptionsts</option>
                        </Select>

                        {selectedOption === 'option1' && (
                            <>
                                <h2>Please enter your details below</h2>
                                <Label htmlFor="firstName">First Name</Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />

                                <Label htmlFor="surname">Surname</Label>
                                <Input
                                    id="surname"
                                    type="text"
                                    name="surname"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />

                                <Label htmlFor="postcode">Postcode</Label>
                                <Input
                                    id="postcode"
                                    type="text"
                                    name="postcode"
                                    value={postcode}
                                    onChange={(e) => setPostcode(e.target.value)}
                                />

                                <Label htmlFor="nhsNumber">NHS Number</Label>
                                <Input
                                    id="nhsNumber"
                                    type="text"
                                    name="nhsNumber"
                                    value={nhsNumber}
                                    onChange={(e) => setNhsNumber(e.target.value)}
                                />
                                <br />
                                <br />
                                <Button type="submit">Sign in</Button>
                            </>
                        )}

                        {selectedOption === 'option2' && (
                            <>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && <p>{errors.username}</p>}

                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p>{errors.password}</p>}
                                <br />
                                <br />
                                <Button type="submit">Sign in</Button>
                            </>
                        )}

                        {selectedOption === 'option3' && (
                            <>
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                {errors.username && <p>{errors.username}</p>}

                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p>{errors.password}</p>}
                                <br />
                                <br />
                                <Button type="submit">Sign in</Button>
                            </>
                        )}

                    </form>
                </fieldset>


                

                <Footer />
            </div>
        );
    };

    const Register = () => {

        const [firstName, setFirstName] = useState('');
        const [surname, setSurname] = useState('');
        const [postcode, setPostcode] = useState('');
        const [nhsNumber, setNhsNumber] = useState('');
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);

        const navigate = useNavigate();

        const handleSubmit = async (event) => {
            event.preventDefault();
            setErrors(validate());
            setIsSubmitting(true);
        };

        const submitForm = useCallback(async () => {

            const data = {
                firstName,
                surname,
                postcode,
                nhsNumber,
            };

            const formData = new FormData();
            formData.append('firstname', firstName);
            formData.append('surname', surname);
            formData.append('postcode', postcode);
            formData.append('nhsNumber', nhsNumber);

            const response = await fetch('http://localhost:4000/register.php', {
                method: 'POST',
                //body: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (result.status === 'success') {
                navigate('/sign-in');
            } else {
                alert(result.message);
            }
        }, [firstName, surname, postcode, nhsNumber, navigate]);

        useEffect(() => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                submitForm();
                setIsSubmitting(false);
            }
        }, [errors, isSubmitting, submitForm]);

        

        const validate = () => {
            let errors = {};

            if (!firstName) {
                errors.firstName = "First name is required";
            }

            if (!surname) {
                errors.surname = "Surname is required";
            }

            if (!postcode) {
                errors.postcode = "Postcode name is required";
            }

            if (!nhsNumber) {
                errors.nhsNumber = "NHS number is required";
            } else if (!/^\d{10}$/.test(nhsNumber)) {
                errors.nhsNumber = "NHS number must be a 10-digit integer";
            }

            return errors;
        };





        

        return (
            <div>

                <TopNav serviceTitle="Register for a GP" />
                <u><GovUKTextLink to="/"><span>&#8592;</span>Back</GovUKTextLink></u>

                
                    
                    <form onSubmit={handleSubmit}>
                    <fieldset>
                        <h2>Please enter your details below</h2>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Label htmlFor="surname">Surname</Label>
                        <Input
                            id="surname"
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />

                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                            id="postcode"
                            type="text"
                            name="postcode"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                        />

                        <Label htmlFor="nhsNumber">NHS Number</Label>
                        <Input
                            id="nhsNumber"
                            type="text"
                            name="nhsNumber"
                            value={nhsNumber}
                            onChange={(e) => setNhsNumber(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button type="submit">Register</Button>
                        </fieldset>
                    
                    </form>
                

                <Footer />

                
            </div>
        );
    };


    const DeRegister = () => {

        const [firstName, setFirstName] = useState('');
        const [surname, setSurname] = useState('');
        const [postcode, setPostcode] = useState('');
        const [nhsNumber, setNhsNumber] = useState('');
        const [errors, setErrors] = useState({});
        const [isSubmitting, setIsSubmitting] = useState(false);

        const navigate = useNavigate();

        const handleSubmit = async (event) => {
            event.preventDefault();
            setErrors(validate());
            setIsSubmitting(true);
        };

        const submitForm = useCallback(async () => {

            const data = {
                firstName,
                surname,
                postcode,
                nhsNumber,
            };

            const formData = new FormData();
            formData.append('firstname', firstName);
            formData.append('surname', surname);
            formData.append('postcode', postcode);
            formData.append('nhsNumber', nhsNumber);

            const response = await fetch('http://localhost:4000/deregister.php', {
                method: 'POST',
                //body: formData,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);

            if (result.status === 'success') {
                navigate('/');
            } else {
                alert(result.message);
            }
        }, [firstName, surname, postcode, nhsNumber, navigate]);

        useEffect(() => {
            if (Object.keys(errors).length === 0 && isSubmitting) {
                submitForm();
                setIsSubmitting(false);
            }
        }, [errors, isSubmitting, submitForm]);



        const validate = () => {
            let errors = {};

            if (!firstName) {
                errors.firstName = "First name is required";
            }

            if (!surname) {
                errors.surname = "Surname is required";
            }

            if (!postcode) {
                errors.postcode = "Postcode is required";
            } else if (!/^(GIR 0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]([0-9ABEHMNPRV-Y])?)|[0-9][A-HJKS-UW]))\s?[0-9][ABD-HJLNP-UW-Z]{2}$/i.test(postcode)) {
                errors.postcode = "Invalid UK postcode";
            }

            if (!nhsNumber) {
                errors.nhsNumber = "NHS number is required";
            } else if (!/^\d{10}$/.test(nhsNumber)) {
                errors.nhsNumber = "NHS number must be a 10-digit integer";
            }

            return errors;
        };


        return (
            <div>

                <TopNav serviceTitle="De-Register" />
                <u><GovUKTextLink to="/"><span>&#8592;</span>Back</GovUKTextLink></u>

                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <h2>Please enter your details below</h2>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <Label htmlFor="surname">Surname</Label>
                        <Input
                            id="surname"
                            type="text"
                            name="surname"
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />

                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                            id="postcode"
                            type="text"
                            name="postcode"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                        />

                        <Label htmlFor="nhsNumber">NHS Number</Label>
                        <Input
                            id="nhsNumber"
                            type="text"
                            name="nhsNumber"
                            value={nhsNumber}
                            onChange={(e) => setNhsNumber(e.target.value)}
                        />
                        <br />
                        <br />
                        <Button type="submit">De-Register</Button>
                    </fieldset>

                </form>

                <Footer />


            </div>
        );
    };


    return (
       <>


            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/de-register" element={<DeRegister />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>

        </> 

    );
}

export default Choose;
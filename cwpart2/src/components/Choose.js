import TopNav from '@govuk-react/top-nav';
import Heading from '@govuk-react/heading';
import Button from '@govuk-react/button';
import Footer from '@govuk-react/footer';
import InputField from '@govuk-react/input-field';
import './Style.css';
import React from 'react';



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GovUKButtonNavigate from './GovUKButtonNavigate';
import GovUKTextLink from './GovUKTextLink';







function Choose () {

    

    const Home = () => {
        return (
            <div>
                
                <TopNav />

                <div1><Heading> GP Registration </Heading></div1>
                <div2><h2>Register Online</h2></div2>
                <div3> <h5>It usually takes about 5 minutes.</h5></div3>
                <div4><GovUKButtonNavigate to="/new-page" >Start Now </GovUKButtonNavigate></div4>
                <div5><h5>do you want to de-register? <GovUKTextLink to="/dereg">Click here</GovUKTextLink></h5></div5>
                <div9><GovUKButtonNavigate to="/new-page">Go to New Page</GovUKButtonNavigate></div9>

                <Footer />
            </div>
        );
    };

    const NewPage = () => {
        return (
            <div>

                <TopNav serviceTitle="Register for a GP" />


                <div1><h2>Please enter your details below</h2></div1>
                <br></br>
                <div2> <InputField>First Name </InputField></div2>
                <br></br>
                <div3><InputField>Surname </InputField></div3>
                <br></br>
                <div4><InputField>Postcode </InputField></div4>
                <br></br>
                <br></br>
                <div5><InputField >NHS number </InputField></div5>
                <br></br>
                <br></br>
                <div6><Button>Register </Button></div6>
                <br></br>
                <div7><GovUKButtonNavigate to="/">Go Back to Home</GovUKButtonNavigate></div7>

                <Footer />

                
            </div>
        );
    };


    const DeReg = () => {
        return (
            <div>
                <h1>Reg</h1>

                <TopNav serviceTitle="De-Register" />


                <div1><h2>Please enter your details below</h2></div1>
                <div2> <InputField>First Name </InputField></div2>
                <div3><InputField>Surname </InputField></div3>
                <div5><InputField>NHS number </InputField></div5>
                <div6><Button>De-Register </Button></div6>
                <div7><GovUKButtonNavigate to="/">Go Back to Home</GovUKButtonNavigate></div7>

                <Footer />


            </div>
        );
    };


    return (
       <>


            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/new-page" element={<NewPage />} />
                    <Route path="/dereg" element={<DeReg />} />
                </Routes>
            </Router>

        </> 

    );
}

export default Choose;
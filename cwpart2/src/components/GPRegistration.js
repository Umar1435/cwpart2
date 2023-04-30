import TopNav from '@govuk-react/top-nav';
import Heading from '@govuk-react/heading';
import Button from '@govuk-react/button';
import Footer from '@govuk-react/footer';
import Link from '@govuk-react/link';
import './App.css';

import Register from './components/Register';
import DeRegister from './components/DeRegister';



function GPRegistration() {
    return (
        <div>

            <TopNav serviceTitle="Choose" />

            <div1><Heading> GP Registration </Heading></div1>
            <div2><h2>Register Online</h2></div2>
            <div3> <h5>It usually takes about 5 minutes.</h5></div3>
            <div4><Button onClick={Register}>Start Now </Button></div4>
            <div5><h5>do you want to de-register? <Link href={DeRegister}>Click Here</Link></h5></div5>
            <div6><h2>OR</h2></div6>
            <div7><h5>If you are registered already.</h5></div7>
            <div8><Button>Sign In </Button></div8>
            <Footer />
        </div>
    );
}

export default GPRegistration;
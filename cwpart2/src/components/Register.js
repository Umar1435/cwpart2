import TopNav from '@govuk-react/top-nav';
//import Heading from '@govuk-react/heading';
import Button from '@govuk-react/button';
import Footer from '@govuk-react/footer';
import InputField from '@govuk-react/input-field';
import './Style.css';

function Register() {
    return (
        <>
            <TopNav serviceTitle="Register for a GP" />

            
            <div2><h2>Please enter your details below</h2></div2>
            <div3> <InputField>First Name </InputField></div3>
            <div5><InputField>Surname </InputField></div5>
            <div6><InputField>Postcode </InputField></div6>
            <div7><InputField>NHS number </InputField></div7>
            <div4><Button>Register </Button></div4>

            <Footer />
        </>
    )
}

export default Register;
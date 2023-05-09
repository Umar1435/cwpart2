import MyHeader from "../Components/MyHeader";
import MyFooter from '../Components/MyFooter.js';
import MySummaryList from "../Components/MySummaryList";
import { Button } from 'govuk-react';
import { Link } from "react-router-dom";
import BackLink from '@govuk-react/back-link';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import EnterPatientDetails from './EnterPatientDetails';
import reportWebVitals from './reportWebVitals';
import './PatientRecords.css';
import { CurrentContext } from "../../../../my-app/src/App";
import { Input, LabelText } from 'govuk-react';
import { CurrentContext } from "../App";
import React, { useState } from "react";
import jq from 'jquery';

function EnterPatientDetails () {
   

          function confirm(e) {
            console.log("egg")
            var patientData = {
                
                "NhsNo": localStorage.getItem("NHSNumber"),
                "forename": localStorage.getItem("ForenameKey"),
                "surname": localStorage.getItem("SurnameKey"),
                "prevVaccines":localStorage.getItem("PrevVaccinesKey"),
                "bloodType":localStorage.getItem("BloodTypeKey"),
                "healthProb":localStorage.getItem("HealthProbKey"),
                "pastAppoint":localStorage.getItem("PastAppointKey"),
                "Postcode":localStorage.getItem("PostcodeKey")
    
    
            }
            var url_cartaxinfo = 'http://localhost:4000/RecordSaver.php';
    
            console.log(patientData);
    
            jq.ajax({//AJAX post
                type: "POST",
                url: url_cartaxinfo,
                mode: "no-core",
                data: patientData,
    
                success(data) {
                    console.log(data);
                    if (data === "Data Updated") {
                        console.log("FINALLLY YES")
                    } else {
                        console.log("ENTER HELL")
                    }
                }
            });
        }
    
        return (
            <>
                <MyHeader />
                <BackLink href="/">Back</BackLink>
                <br />
                <MySummaryList />
                <br />
                <Link onClick={confirm} to="/UpdateMedicalRecords"><Button>Submit</Button></Link>
                <MyFooter />
            </>
        );
    }
    function update() {
        console.log("egg")
        var patientData = {
           
            "NhsNo": localStorage.getItem("NHSNumber"),
            "Postcode": localStorage.getItem("PostcodeKey"),
            "prevVaccines":localStorage.getItem("PrevVaccinesKey"),
            "pastAppoint":localStorage.getItem("PastAppointKey")
            
        }
        var url_cartaxinfo = 'http://localhost:4000/RecordSaver.php';

        console.log(patientData);

        jq.ajax({//AJAX post
            type: "POST",
            url: url_cartaxinfo,
            mode: "no-core",
            data: patientData,

            success(data) {
                console.log(data);
                if (data === "Data Updated") {
                    console.log("FINALLLY YES")
                } else {
                    console.log("ENTER HELL")
                }
            }
        });
    }

    return (
        <>
            <MyHeader />
            <BackLink href="/">Back</BackLink>
            <br />
            <MySummaryList />
            <br />
            <Link onClick={UpdateMedicalRecords} to="/UpdateMedicalRecords"><Button>Submit</Button></Link>
            <MyFooter />
        </>
    );

    function MyInput() 
    {


        function firstNameCapture(e) {
            CurrentContext.firstName = e.target.value;
        }
    
        function surNameCapture(e) {
            CurrentContext.surname = e.target.value;
        }
    
        function nhsNumberCapture(e) {
            CurrentContext.nhsNumberInput = e.target.value;
            localStorage.setItem("NHSNumber", CurrentContext.nhsNumberInput);
        }
    
        function FindRecords() {
    
            var patientData = {
                "NhsNo": CurrentContext.nhsNumberInput
            }
            var url_cartaxinfo = 'http://localhost:4000/RecordFinder.php';
    
            jq.ajax({//AJAX post
                type: "POST",
                url: url_cartaxinfo,
                mode: "no-core",
                data: patientData,
    
                success(data) {
                    console.log(data);
                    if (data === "no records") {
                        console.log("")
                    } else {
                        var json = jq.parseJSON(data)
    
                        CurrentContext.Forename = json[0].Forename;
                        CurrentContext.Surname = json[0].Surname;
                      
    
                        {
                            
                        }                    
                        CurrentContext.Postcode = json[0].Postcode;
                    }
                }
            });
        }
    
    
        return {}
            <
                <fieldset>
                    <legend>
                        <h1> Enter Your Details </h1>
                    </legend>
    
                    <div>
                        <LabelText> First Name </LabelText>
                        <Input onChange={firstNameCapture} />
                    </div>
    
                    <div>
                        <LabelText > Surname </LabelText>
                        <Input onChange={surNameCapture} />
                    </div>
    
                    <div>
                        <LabelText > NHS Number </LabelText>
                        <Input  onInput={nhsNumberCapture} onChange={FindRecords} />
                    </div>
    
                </fieldset>
                

    }
    
    var varForename = CurrentContext.Forename;
    var varSurname = CurrentContext.Surname;
    var varPostcode = CurrentContext.Postcode;
    var varprevVaccine = CurrentContext.prevVaccine;
    var varpastAppoint = CurrentContext.pastAppoint;
    var varbloodtype = CurrentContext.bloodtype;
    var varHealthProb = CurrentContext.HealthProb;




    function save() {
        if (CurrentContext.dataChanged == true) {
            varForename = localStorage.getItem("ForenameKey");
            varSurname = localStorage.getItem("SurnameKey");
            varPostcode = localStorage.getItem("PostcodeKey");
            varprevVaccine = localStorage.getItem("prevVaccine");
            varpastAppoint = localStorage.getItem("pastAppoint");
            varbloodtype = localStorage.getItem("bloodtype");
            varHealthProb = localStorage.getItem("HealthProb");
           

        } else {
            localStorage.setItem("ForenameKey", varForename);
            localStorage.setItem("SurnameKey", varSurname);
            localStorage.setItem("PostcodeKey", varPostcode);
            localStorage.setItem("PrevVaccineKey",varprevVaccine);
            localStorage.setItem("PastAppointKey",pastAppoint);
            localStorage.setItem("BloodtypeKey",bloodtype);
            localStorage.setItem("HealthProb",HealthProb);


        
        }        
    
    
        <dl class="govuk-summary-list" >

            <div class="govuk-summary-list__row" onLoad={save()}>
                <dt class="govuk-summary-list__key"> Forename </dt>
                <dd class="govuk-summary-list__value"> {varForename} </dd>
                <dd class="govuk-summary-list__actions"> <a class="govuk-link" href="/UpdateForename"> Change <span class="govuk-visually-hidden"> Forename</span></a></dd>
            </div>

            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key"> Surname </dt>
                <dd class="govuk-summary-list__value"> {varSurname} </dd>
                <dd class="govuk-summary-list__actions"> <a class="govuk-link" href="/UpdateSurname"> Change <span class="govuk-visually-hidden"> Surname</span></a></dd>
            </div>

            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">prevVaccine</dt>
                <dd class="govuk-summary-list__value">{varprevVaccine} </dd>
                <dd class="govuk-summary-list__actions"><a class="govuk-link" href="/UpdateprevVaccine">Change<span class="govuk-visually-hidden"> prevVaccine</span></a></dd>
            </div>

            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">pastAppoint</dt>
                <dd class="govuk-summary-list__value">{varpastAppoint}</dd>
                <dd class="govuk-summary-list__actions"><a class="govuk-link" href="/UpdatepastAppoint"> Change <span class="govuk-visually-hidden"> pastAppoint</span></a></dd>
            </div>               

            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">PostCode</dt>
                <dd class="govuk-summary-list__value">{varPostcode}</dd>
                <dd class="govuk-summary-list__actions"><a class="govuk-link" href="/UpdatePostcode">Change<span class="govuk-visually-hidden"> PostCode</span></a></dd>
            </div>
            

            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key">bloodtype</dt>
                <dd class="govuk-summary-list__value">{varbloodtype}</dd>
                <dd class="govuk-summary-list__actions"><a class="govuk-link" href="/Updatebloodtype">Change<span class="govuk-visually-hidden"> bloodType</span></a></dd>
            </div>
            
            <div class="govuk-summary-list__row">
                <dt class="govuk-summary-list__key"> HealthProb</dt>
                <dd class="govuk-summary-list__value">{varHealthProb}</dd>
                <dd class="govuk-summary-list__actions"><a class="govuk-link" href="/UpdateHealthProb">Change<span class="govuk-visually-hidden"> HealthProb</span></a></dd>
            </div>
            

        </dl>
    
}

    


export default EnterPatientDetails;
import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { createClinic } from '../actions';
import { read_cookie,bake_cookie } from 'sfcookies';
import axios from 'axios';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            address:'',
            city:'',
            country:'',
            zipCode:'',
            phoneNumber:'',
            allClinics:null,
            username:'',
            password:'',
            confirmPass:'',
            role:''
        }
    }

    addClinic(e){
        e.preventDefault();
        let { name,address,city,country,zipCode,phoneNumber } = this.state;
        const token = read_cookie('token');
        let params = new URLSearchParams();
        params.append('token',token);
        params.append('name',name);
        params.append('address',address);
        params.append('city',city);
        params.append('country',country);
        params.append('zipCode',zipCode);
        params.append('phoneNumber',phoneNumber);
        const BASE_URL = 'https://project-cx.herokuapp.com/admin/clinics';
        axios.post(BASE_URL,params).then((response)=>{
            console.log('Clinic ID:',response.data.id);
            console.log(response);
            this.props.createClinic(response.data.id);
        });

    }
    componentDidMount(){
        const token = read_cookie('token');
        if( token.length === 0 ){
            bake_cookie('redirect', 'clinics/new');
            this.props.history.push("/login");
        }
    }
    signOut(){
        bake_cookie('token','');
        this.props.history.push("/login");
    }
    createNewUser(){
        let { username,password,confirmPass,role } = this.state;
        const token = read_cookie('token');
        let params = new URLSearchParams();
        params.append('token',token);
        params.append('username',username);
        params.append('password',password);
        params.append('role',role);
        params.append('entityAttachedTo',this.props.clinic);
        const BASE_URL = 'https://project-cx.herokuapp.com/admin/users';
        if(password === confirmPass && password !== ''){
            axios.post(BASE_URL,params).then((response)=>{
                console.log(response);
            });
        }
        else{
            document.getElementById('con_pass').focus();
            document.getElementById('con_pass').style.borderColor = 'red';
        }
    }
    showClinics(){
        this.props.history.push("/clinics");
    }
    render(){
        console.log(this.props);
        return(
            <div>
                <div className="col-sm-offset-4 col-sm-4" >
                    <h1>Create Clinic:</h1>
                    <form action="" onSubmit={event=>this.addClinic(event)}>
                        <input className="form-control paddings" type="text" placeholder="Enter Clinic Name" onChange={event=> this.setState({name:event.target.value})}/>
                        <input className="form-control paddings" type="text" placeholder="Enter Address" onChange={event=> this.setState({address:event.target.value})}/>
                        <input className="form-control paddings" type="text" placeholder="Enter City" onChange={event=> this.setState({city:event.target.value})}/>
                        <input className="form-control paddings" type="text" placeholder="Enter Country" onChange={event=> this.setState({country:event.target.value})}/>
                        <input className="form-control paddings" type="number" placeholder="Enter ZipCode" onChange={event=> this.setState({zipCode:event.target.value})}/>
                        <input className="form-control paddings" type="number" placeholder="Enter Phone Number" onChange={event=> this.setState({phoneNumber:event.target.value})}/>
                        <button className="btn btn-primary paddings" type="submit" >Submit</button>
                        <button className="btn btn-primary paddings signout" type="button" onClick={()=>this.signOut()}>SignOut</button>
                    </form>
                </div>
                <div className="col-sm-offset-4 col-sm-4">
                    <h1>Clinic User:</h1>
                    <input className="form-control paddings" type="text" placeholder="Enter User Name" onChange={event=> this.setState({username:event.target.value})}/>
                    <input className="form-control paddings" type="password" placeholder="Enter Password:" onChange={event=> this.setState({password:event.target.value})}/>
                    <input className="form-control paddings" type="password" id="con_pass" placeholder="Confirm Password" onChange={event=> this.setState({confirmPass:event.target.value})}/>
                    {(this.state.password === this.state.confirmPass && this.state.password ) ? 'Valid Password': 'Invalid Password'}
                    <input className="form-control paddings" type="hidden" placeholder="" value="clinic" onChange={event=> this.setState({role:event.target.value})}/>
                    <br/><button className="btn btn-primary paddings" type="button" onClick={()=>this.createNewUser()}>Create User</button>
                </div>
                <div className="col-sm-offset-4 col-sm-4 show-all">
                    <button className="btn btn-primary paddings full" type="button" onClick={()=>this.showClinics()}>Show All Clinics</button>
                </div>
                <div className="">
                    <button className="btn btn-primary paddings" onClick={() => this.props.history.push("/doctors/new")}>New Doctor</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state) {

    return{
        clinic:state
    }
}

export default connect(mapStateToProps,{createClinic})(App);
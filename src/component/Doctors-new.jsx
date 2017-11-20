import React,{ Component } from 'react';
import { read_cookie,bake_cookie } from 'sfcookies';
import axios from 'axios';
import { connect } from 'react-redux';
class Doctors_new extends Component{
    constructor(props){
        super(props);
        this.state = {
            name:'',
            qualification:'',
            gender:'',
            category:'',
            speciality:'',
            phone:'',
            username:'',
            password:'',
            confirmPass:'',
            role:'',
            d_id:''
        }
    }
    createDoctor(e){
        e.preventDefault();
        let { name,qualification,gender,category,speciality,phone } = this.state;
        const token = read_cookie('token');
        console.log(this.props);
        const BASE_URL = 'https://project-cx.herokuapp.com/admin/doctors';
        axios.post(BASE_URL,{
            clinicId:this.props.clinic,
            token,
            name,
            qualification,
            gender,
            category,
            speciality,
            phone
        }).then((response)=>{
            // console.log('Doctor ID:',response.data.id);
            console.log(response);
            this.setState({d_id:response.data.id});
        }).catch((message)=>{
            console.log(message);
        });
    }
    componentDidMount(){
        const token = read_cookie('token');
        if( token.length === 0){
            bake_cookie('redirect', 'doctors/new');
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
        const BASE_URL = 'https://project-cx.herokuapp.com/admin/users';
        let params = new URLSearchParams();
        params.append('token',token);
        params.append('username',username);
        params.append('password',password);
        params.append('role',role);
        params.append('entityAttachedTo',this.state.d_id);
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
    showDoctors(){
        this.props.history.push("/doctors");
    }
    render(){
        return(
            <div>
                <div className="col-sm-offset-4 col-sm-4">
                    <form action="">
                        <h1>Create Doctor:</h1>
                        <input className="form-control paddings" type="text" placeholder="Name" onChange={event => this.setState({name:event.target.value})}/>
                        <input className="form-control paddings" type="text" placeholder="Qualifications"  onChange={event => this.setState({qualification:event.target.value})}/>
                        <select className="form-control paddings" name="Gender" id=""  onChange={event => this.setState({gender:event.target.value})}>
                            <option value="">Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input className="form-control paddings" type="text" placeholder="category"  onChange={event => this.setState({category:event.target.value})}/>
                        <input className="form-control paddings" type="text" placeholder="speciality"  onChange={event => this.setState({speciality:event.target.value})}/>
                        <input className="form-control paddings" type="text" placeholder="phone"  onChange={event => this.setState({phone:event.target.value})}/>
                        <button className="btn btn-primary paddings" type="submit" onClick={event => this.createDoctor(event)}>Submit</button>
                        <button className="btn btn-primary paddings signout" type="button" onClick={()=>this.signOut()}>SignOut</button>
                    </form>
                </div>
                <div className="col-sm-offset-4 col-sm-4">
                    <form action="">
                        <h1>Doctor User:</h1>
                        <input className="form-control paddings" type="text" placeholder="Enter User Name" onChange={event=> this.setState({username:event.target.value})}/>
                        <input className="form-control paddings" type="password" placeholder="Enter Password:" onChange={event=> this.setState({password:event.target.value})}/>
                        <input className="form-control paddings" type="password" id="con_pass" placeholder="Confirm Password" onChange={event=> this.setState({confirmPass:event.target.value})}/>
                        {(this.state.password === this.state.confirmPass && this.state.password ) ? 'Valid Password': 'Invalid Password'}
                        <input className="form-control paddings" type="hidden" placeholder="Confirm Password" value="doctor" onChange={event=> this.setState({role:event.target.value})}/>
                        <br/><button className="btn btn-primary paddings" type="button" onClick={()=>this.createNewUser()}>Create User</button>
                    </form>
                </div>
                <div className="col-sm-offset-4 col-sm-4 show-all">
                    <button className="btn btn-primary paddings full" type="button" onClick={()=>this.showDoctors()}>Show All Doctors</button>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        clinic:state
    }

}
export default connect(mapStateToProps)(Doctors_new);
import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bake_cookie,read_cookie } from 'sfcookies';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            username:'',
            password:'',
            responcemsg:''
        }
    }
    componentWillMount(){
        const token = read_cookie('token');
        this.setState({token:token});
        if(token.length !== 0){
            this.props.history.push("/clinics");
        }
    }
    show(e){
        e.preventDefault();
        const BASE_URL = 'https://project-cx.herokuapp.com/auth';
        let params = new URLSearchParams();

        let { username,password} = this.state;
        params.append('username',username);
        params.append('password',password);
        axios.post(BASE_URL,params).then((response) =>{
            this.setState({responcemsg:response.data.message});
            if(response.data.success){
                bake_cookie('token', response.data.token);
                let redirect = (read_cookie('redirect').length !== 0 ) ? read_cookie('redirect'):'/clinics/new';
                bake_cookie('redirect','');
                this.props.history.push(redirect);

            }
        })
    }

    render(){
        return(
            <div className="col-sm-offset-4 col-sm-4" style={{paddingTop:'20px',textAlign:'center'}}>
                <form action="" onSubmit = {event => this.show(event) }>
                    <input required className="form-control" type="text" placeholder="Enter Username" onChange = {event => this.setState({username:event.target.value})} style={{marginTop:'20px'}}/>
                    <input required className="form-control" type="password" placeholder="Enter Password" onChange = {event => this.setState({password:event.target.value})} style={{marginTop:'20px'}}/>
                    <button type="submit" className="btn btn-primary" style={{marginTop:'20px'}}>Submit</button>
                </form>
                <div>
                    <p>{this.state.responcemsg}</p>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        loggedIn:true
    }
}
export default connect(mapStateToProps)(Login);
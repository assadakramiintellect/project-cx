import React,{ Component } from 'react';
import axios from 'axios';
import { read_cookie,bake_cookie } from 'sfcookies';
class Clinics extends Component{

    constructor(props){
        super(props);
        this.state = {
            allClinics:null
        }
    }
    componentWillMount(){
        let token = read_cookie('token');
        const BASE_URL = 'https://project-cx.herokuapp.com/admin/clinics?token='+token;
        if(token.length !== 0){
            axios.get(BASE_URL,{
            }).then((response)=>{
                this.setState({allClinics:response.data.data});
            });
        }
        else{
        }
    }
    componentDidMount(){
        const token = read_cookie('token');
        console.log(read_cookie('token').length);
        if( token.length === 0 ){
            bake_cookie('redirect', 'clinics');
            this.props.history.push("/login");
        }
    }
    render(){
        return(
            <div>
                <div className="col-sm-offset-4 col-sm-4">
                    <table className="table table-striped table-bordered table-hover table-condensed">
                        <thead>
                        <tr>
                            <th>Clinic name</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Country</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.allClinics) ? this.state.allClinics.map(single => {
                            return(
                                <tr key={single._id}>
                                    <td>{single.name}</td>
                                    <td>{single.address}</td>
                                    <td>{single.city}</td>
                                    <td>{single.country}</td>
                                </tr>
                            )
                        }): <tr>
                            <td colSpan="4" className="loader"><img src={require('./images/Loading_icon.gif')} alt=""/></td>
                        </tr>}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4">
                    <div></div>
                    <button className="btn btn-primary paddings-top" onClick={() => this.props.history.push("/clinics/new")} >Create New</button>
                </div>
            </div>
        )
    }
}

export default Clinics;
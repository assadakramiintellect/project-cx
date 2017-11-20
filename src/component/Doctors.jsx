import React,{ Component } from 'react';
import axios from 'axios';
import { read_cookie,bake_cookie } from 'sfcookies';
class Doctors extends Component{

    constructor(props){
        super(props);
        this.state = {
            allClinics:null
        }
    }
    componentWillMount(){
        let token = read_cookie('token');
        const BASE_URL = 'https://project-cx.herokuapp.com/admin/doctors?token='+token;
        axios.get(BASE_URL,{
        }).then((response)=>{
            this.setState({allClinics:response.data.data});
            console.log(response);
        });
    }
    componentDidMount(){
        const token = read_cookie('token');
        if( token.length === 0){
            bake_cookie('redirect', 'doctors');
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
                            <th>Doctor Name</th>
                            <th>Qualification</th>
                            <th>Gender</th>
                            <th>Category</th>
                        </tr>
                        </thead>
                        <tbody>
                        {(this.state.allClinics) ? this.state.allClinics.map(single => {
                            return(
                                <tr key={single._id}>
                                    <td>{single.name}</td>
                                    <td>{single.qualification}</td>
                                    <td>{single.gender}</td>
                                    <td>{single.category}</td>
                                </tr>
                            )
                        }): <tr>
                            <td colSpan="4" className="loader"><img src={require('./images/Loading_icon.gif')} alt=""/></td>
                        </tr>}
                        </tbody>
                    </table>
                </div>
                <div className="col-sm-4">
                    <button className="btn btn-primary paddings-top" onClick={() => this.props.history.push("/doctors/new")} >Create New</button>
                </div>
            </div>
        )
    }
}

export default Doctors;
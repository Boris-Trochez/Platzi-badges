import React from 'react';

import './styles/BadgeEdit.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';

class BadgeEdit extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      email: '',
      jobTitle: '',
      twitter: '',
    },
  };  

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async event => {
    this.setState({loading: true, error: null});

    try {
      const data = await api.badges.read(
        this.props.match.params.badgeId
      );

      this.setState({loading: false, form: data});
    } catch (error) {
      this.setState({loading: false, error: error});
    }
  }

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  
  handleSubmit = async e =>{
    e.preventDefault()
    this.setState({loading: true, error: null});
    
    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({loading: false});

      this.props.history.push('/badges');  //Una vez se hace submit del formulario nos redirige a la pagina badges... recordar que al pasarle las paginas a las rutas de react router estas reciben tres props: match, history y location
    } catch (error) {
      this.setState({loading: false, error: error});
    }
  }
  
  render() {
    if (this.state.loading) {
      return <PageLoading />
    }
    return (
      <React.Fragment>
        <div className="BadgeEdit__hero">
          <img className="BadgeEdit__hero-image img-fluid" src={header} alt="Logo" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-6">
              <Badge
                firstName={this.state.form.firstName || 'First_Name'} 
                lastName={this.state.form.lastName || 'Last_Name'}
                twitter={this.state.form.twitter || 'twitter'}
                jobTitle={this.state.form.jobTitle || 'Job_Title'}
                email={this.state.form.email || 'Email'}
                avatarUrl="https://www.gravatar.com/avatar/21594ed15d68ace3965642162f8d2e84?d=identicon"
              />
            </div>

            <div className="col-6">
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;

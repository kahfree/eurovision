import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import AppNavbar from './AppNavbar';
import strings from './Messages';

class EntrantEdit extends Component {

    emptyItem = {
        id: '',
        venueID: '',
        logo: '',
        hostCity: '',
        dateOfFinal: '',
        hostCountry: '',
        section: '',
        artist: '',
        song: '',
        artistCountry: '',
        runningOrder: '',
        totalPoints: '',
        rank: '',
        qualified: '',
    };

    constructor(props) {
        super(props);
        this.state = {
            entrant: this.emptyItem,
            faults: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.localeService = this.localeService.bind(this);
    }

    localeService() {
        const queryParameters = new URLSearchParams(window.location.search)
        const type = queryParameters.get("lang");
        return type != null ? type : "en";
    }
    //Lifecycle method that is called after the components initial render
    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const client = await (await fetch(`/entrants/${this.props.match.params.id}`)).json();
            this.setState({entrant: client});
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let entrant = {...this.state.entrant};
        entrant[name] = value;
        this.setState({entrant});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {entrant} = this.state;
        const lang = this.localeService() + "_IE";
        await fetch('/entrants' + (entrant.id ? '/' + entrant.id + "?lang=" + lang: ''), {
            method: (entrant.id) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entrant),
        }).then((response) =>{
            if(response.ok === true){
                this.props.history.push('/entrants');
            }else{
                var result = [];
                response.json().then((data) => {
                  for (var key in data) {
                    result.push(data[key]);
                  }
                  this.setState({
                    faults: result,
                  });
                  window.scrollTo(0, 0);
                });
              }
        });
        
    }

    //Must return a react element
    render() {
        const {entrant} = this.state;
        const {faults} = this.state;
        strings.setLanguage(this.localeService())
        return <div>
        <AppNavbar/>
        <Container>
            <h2>{strings.general.editTitle}</h2>

            <ul>
            {faults ? (faults.map(fault => {
                return <li style={{color:"red"}}>{fault}</li>
            })) : (null)}
            </ul>
                <Form onSubmit={this.handleSubmit} style={{background:"#DBFCFF"}} className='p-4 rounded'>
                    <Row>
                        <FormGroup className='col-md-3'>
                            <Label for="id">{strings.entrant.id}</Label>
                            <Input type="text" name="id" id="id" value={entrant.id || ''}
                                onChange={this.handleChange} autoComplete="name" readOnly/>
                        </FormGroup>
                        <FormGroup className='col-md-3'>
                            <Label for="venueID">{strings.entrant.venueID}</Label>
                            <Input type="text" name="venueID" id="venueID" value={entrant.venueID || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-6'>
                            <Label for="logo">{strings.entrant.logo}</Label>
                            <Input type="text" name="logo" id="logo" value={entrant.logo || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className='col-md-6'>
                            <Label for="hostCity">{strings.entrant.hostCity}</Label>
                            <Input type="text" name="hostCity" id="hostCity" value={entrant.hostCity || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-6'>
                        <Label for="hostCountry">{strings.entrant.hostCountry}</Label>
                        <Input type="text" name="hostCountry" id="hostCountry" value={entrant.hostCountry || ''}
                               onChange={this.handleChange} autoComplete="email"/>
                    </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className='col-md-6'>
                                <Label for="dateOfFinal">{strings.entrant.dateOfFinal}</Label>
                                <Input type="date" name="dateOfFinal" id="dateOfFinal" value={entrant.dateOfFinal || ''}
                                    onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-6'>
                            <Label for="section">{strings.entrant.section}</Label>
                            <Input type="text" name="section" id="section" value={entrant.section || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className='col-md-4'>
                            <Label for="artist">{strings.entrant.artist}</Label>
                            <Input type="text" name="artist" id="artist" value={entrant.artist || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-4'>
                            <Label for="song">{strings.entrant.song}</Label>
                            <Input type="text" name="song" id="song" value={entrant.song || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-4'>
                            <Label for="artistCountry">{strings.entrant.artistCountry}</Label>
                            <Input type="text" name="artistCountry" id="artistCountry" value={entrant.artistCountry || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup className='col-md-3'>
                            <Label for="runningOrder">{strings.entrant.runningOrder}</Label>
                            <Input type="number" name="runningOrder" id="runningOrder" value={entrant.runningOrder || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-3'>
                            <Label for="totalPoints">{strings.entrant.totalPoints}</Label>
                            <Input type="number" name="totalPoints" id="totalPoints" value={entrant.totalPoints || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-3'>
                            <Label for="rank">{strings.entrant.rank}</Label>
                            <Input type="number" name="rank" id="rank" value={entrant.rank || ''}
                                onChange={this.handleChange} autoComplete="email"/>
                        </FormGroup>
                        <FormGroup className='col-md-3'>
                            <Label for="qualified">{strings.entrant.qualified}</Label>
                            <Input id="qualified" name="qualified" type="select" value={entrant.qualified || ''} className="mb-1">
                            <option>TRUE</option>
                            <option>FALSE</option>
                            </Input>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Button block color="primary" type="submit">{strings.general.save}</Button>{' '}
                            <Button block color="secondary" tag={Link} to="/entrants">{strings.general.cancel}</Button>
                        </FormGroup>
                    </Row>
                </Form>
            </Container>
        </div>
    }
}
export default withRouter(EntrantEdit);
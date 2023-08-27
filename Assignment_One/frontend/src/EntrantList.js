import React, { Component } from 'react';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Table, Container, Form, FormGroup, Input, Label} from 'reactstrap';
import {
    Accordion,
    AccordionBody,
    AccordionHeader,
    AccordionItem,
  } from 'reactstrap';
import strings from './Messages';
import TestSlider from './Slider';

class EntrantList extends Component {

    emptyItem = {
        artistCountry : '*',
        beforeDate : '0000-02-02',
        afterDate : '9999-02-02',
    };
    emptySearchTwo = {
        hostCountry : '*',
        capacity: 0,
        section: 'final'
    }

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem,
            searchTwo: this.emptySearchTwo,
            entrants: [],
            sections: [],
            locale: "en",
            sliderValue: 0,
            open: '0'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearchTwo = this.handleSearchTwo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.localeService = this.localeService.bind(this);
        this.handleSubmitSearchTwo = this.handleSubmitSearchTwo.bind(this);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.someProp === nextProps.someProp ) {
    //       // props haven't changed, don't update
    //       return false;
    //     }
    //     // props have changed, update
    //     return true;
    // }

    localeService() {
        const queryParameters = new URLSearchParams(window.location.search)
        const type = queryParameters.get("lang");
        return type != null ? type : "en";
    }

    componentDidMount() {
        fetch('/entrants')
            .then(response => response.json())
            .then(data => this.setState({entrants: data}));
            console.log('Got all the entrants');
        fetch('/sections')
            .then(response => response.json())
            .then(data => this.setState({sections: data}));
            console.log('Got the sections');
        
    }
    
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    handleSearchTwo(event){
        const target = event.target;
        const value= target.value;
        const name = target.name;
        let searchTwo = {...this.state.searchTwo};
        searchTwo[name] = value;
        this.setState({searchTwo});
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {item} = this.state;
        fetch(`/entrants/${item.artistCountry}/${item.beforeDate}/${item.afterDate}`)
            .then(response => response.json())
            .then(data => this.setState({entrants: data}));
    }

    async handleSubmitSearchTwo(event){
        event.preventDefault();
        const {searchTwo} = this.state;
        const {sliderValue} = this.state;
        console.log(`/entrants/searchtwo/${searchTwo.hostCountry}/${sliderValue}/${searchTwo.section}`)
        fetch(`/entrants/searchtwo/${searchTwo.hostCountry}/${sliderValue}/${searchTwo.section}`)
            .then(response => response.json())
            .then(data => this.setState({entrants: data}));
    }

    handleSlider = (e) => {
        this.setState({sliderValue: e.target.value});
    }

    toggle = (id) => {
        if (this.state.open === id) {
          this.setState({ open: '' });
        } else {
          this.setState({ open: id });
        }
      };

    render() {
        const {entrants, isLoading} = this.state;
        const {open} = this.state;
        const {sections} = this.state;
        strings.setLanguage(this.localeService())
        if (isLoading) {
            return <p>{strings.general.loading}...</p>;
        }
    
        const entrantList = entrants.map(entrant => {
            return <tr key={entrant.id}>
                <td>{entrant.logo}</td>
                <td>{entrant.dateOfFinal}</td>
                <td>{entrant.hostCountry}</td>
                <td>{entrant.artist}</td>
                <td>{entrant.song}</td>
                <td>{entrant.artistCountry}</td>
                <td>{entrant.totalPoints}</td>
                <td>{entrant.rank}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/entrants/drilldown/" + entrant.id + "?lang=" + this.localeService()}>{strings.general.drilldown}</Button>
                        <Button size="sm" color="secondary" tag={Link} to={"/entrants/" + entrant.id + "?lang=" + this.localeService()}>{strings.general.edit}</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        const sectionList = sections.map(section => {return <option>{section}</option>}); 
        
        return (
            <div  style={{background:"white"}}>
                
                <AppNavbar/>
                <Container>
                        <h1 style={{textAlign:"center"}}>{strings.general.entrants}</h1>
        <Accordion open={open} toggle={this.toggle} className='shadow rounded mb-5'>
        <AccordionItem>
          <AccordionHeader targetId="1">{strings.general.firstSearch}</AccordionHeader>
          <AccordionBody accordionId="1">
          <Form onSubmit={this.handleSubmit} className="p-2">
                    <FormGroup>
                        <Label for="artistCountry">{strings.entrant.artistCountry}</Label>
                        <Input type="text" name="artistCountry" id="artistCountry"
                            onChange={this.handleChange} autoComplete="name"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="beforeDate">{strings.general.beforeDate}</Label>
                        <Input type="date" name="beforeDate" id="beforeDate"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="afterDate">{strings.general.afterDate}</Label>
                        <Input type="date" name="afterDate" id="afterDate"
                            onChange={this.handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" type="submit">{strings.general.search}</Button>
                    </FormGroup>
                </Form>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">{strings.general.secondSearch}</AccordionHeader>
          <AccordionBody accordionId="2">
          <Form onSubmit={this.handleSubmitSearchTwo} className="p-2">
                <FormGroup>
                    <Label for="hostCountry">{strings.entrant.hostCountry}</Label>
                    <Input type="text" name="hostCountry" id="hostCountry"
                        onChange={this.handleSearchTwo} autoComplete="name"/>
                </FormGroup>
                <FormGroup>
                    <Label for="capacity">{strings.venue.capacity}</Label>
                    <TestSlider setState={this.handleSlider} id="capacity" name="capacity"/>
                </FormGroup>
                <Label for="section">{strings.entrant.section}</Label>
                <Input id="section" name="section" type="select" className="mb-1" onChange={this.handleSearchTwo}>
                {sectionList}
                </Input>
                <FormGroup>
                    <Button color="primary" type="submit">{strings.general.search}</Button>
                </FormGroup>
            </Form>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
            <Container className="rounded shadow p-3 mb-5 col-md-12" style={{background:"#DBFCFF"}}>
                    <Table  responsive striped hover size="sm">
                        <thead>
                        <tr>
                            <th width="20%">{strings.entrant.logo}</th>
                            <th width="10%">{strings.entrant.dateOfFinal}</th>
                            <th width="10%">{strings.entrant.hostCountry}</th>
                            <th width="10%">{strings.entrant.artist}</th>
                            <th width="10%">{strings.entrant.song}</th>
                            <th width="10%">{strings.entrant.artistCountry}</th>
                            <th width="10%">{strings.entrant.totalPoints}</th>
                            <th width="10%">{strings.entrant.rank}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {entrantList}
                        </tbody>
                        </Table>
                    </Container>
                </Container>
            </div>
        );
    }
}
export default EntrantList;
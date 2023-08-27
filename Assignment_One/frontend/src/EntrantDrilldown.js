import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import strings from './Messages';

class EntrantDrilldown extends Component {

    entrant = {
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

    venue = {
        venueID: '',
        name: '',
        capacity: '',
        note: '',
    }

    image = {}

    constructor(props) {
        super(props);
        this.state = {
            e: this.entrant,
            v: this.venue,
            img: this.image,
        };
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
            const entrantClient = await (await fetch(`/entrants/${this.props.match.params.id}`)).json();
            console.log(entrantClient)
            const venueClient = await (await fetch(`/venues/${entrantClient.venueID}`)).json();
            console.log(venueClient);
            const imageClient = await (await fetch(`/entrants/image/${this.props.match.params.id}`));
            console.log(imageClient);
            const imageBlob = await imageClient.blob();
            console.log(imageBlob);
            const imageObjectURL = URL.createObjectURL(imageBlob);
            console.log(imageObjectURL);
            
            this.setState({e: entrantClient, v: venueClient, img: imageObjectURL});
        }
    }

    //Must return a react element
    render() {
        const {e} = this.state;
        const {v} = this.state;
        const {img} = this.state;
        {strings.setLanguage(this.localeService())}
    
        return <div>
        <AppNavbar/>
        <Container fluid style={{width: "60%"}}>
            <h3 style={{marginTop:"1em", textAlign:"center"}}>{strings.general.drilldownTitle} (#{e.id})</h3>
            <img style={{marginLeft:"auto", marginRight: "auto", display: "block", width: "40%"}} src={img} alt={e.logo}/>
          <Table size="sm" style={{marginTop:"1em", textAlign:"left", width:"80%",marginLeft:"auto",marginRight:"auto"}}>
          <thead>
            <tr>
              <th>{strings.general.entrant}</th>
              <th>{strings.general.value}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">{strings.entrant.id}</th>
              <td>
                {e.id}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.venue.venueID}</th>
              <td>
                {e.venueID}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.venue.name}</th>
              <td>
                {v.name}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.venue.capacity}</th>
              <td>
                {v.capacity}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.venue.note}</th>
              <td>
                {v.note}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.hostCity}</th>
              <td>
                {e.hostCity}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.dateOfFinal}</th>
              <td>
                {e.dateOfFinal}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.hostCountry}</th>
              <td>
                {e.hostCountry}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.section}</th>
              <td>
                {e.section}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.artist}</th>
              <td>
                {e.artist}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.song}</th>
              <td>
                {e.song}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.artistCountry}</th>
              <td>
                {e.artistCountry}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.runningOrder}</th>
              <td>
                {e.runningOrder}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.totalPoints}</th>
              <td>
                {e.totalPoints}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.rank}</th>
              <td>
                {e.rank}
              </td>
            </tr>
            <tr>
              <th scope="row">{strings.entrant.qualified}</th>
              <td>
                {e.qualified}
              </td>
            </tr>
          </tbody>
        </Table>
      </Container>
      </div>
    }
}
export default withRouter(EntrantDrilldown);
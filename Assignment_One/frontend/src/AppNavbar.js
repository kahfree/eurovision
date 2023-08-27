import React, {Component} from 'react';
import {Navbar, NavbarBrand} from 'reactstrap';
import {Link} from 'react-router-dom';
import strings from './Messages';
import { Button, ButtonGroup, Container } from 'reactstrap';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return <Navbar  dark expand="md" style={{background:"#094D92"}} >
            <Container className="w-80">
            <NavbarBrand tag={Link} to="/" className="p-3">{strings.general.home}</NavbarBrand>
            <ButtonGroup>
                <Button size="sm" color="primary" tag={Link} to={"?lang=ga"}>GA</Button>
                <Button size="sm" color="secondary" tag={Link} to={"?lang=en"}>EN</Button>
            </ButtonGroup>
            </Container>
        </Navbar>;
    }
}
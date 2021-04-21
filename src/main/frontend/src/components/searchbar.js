import React, {Component} from 'react';

import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Searchbar extends Component {

    render() {

        return (
            <div className="searchbar" style={{position:"flex"}}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-light">Search</Button>
                </Form>
            </div>
        )
    }
}

export default Searchbar;
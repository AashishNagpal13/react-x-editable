import React, {Component} from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock
} from 'react-bootstrap';
export default class Select extends Component {
  constructor(props){
    super(props);
    this.state = {
      value : props.value,
      options : this.setInitialOptions()
    };
  }
  setInitialOptions = () => {
    const options = this.props.options;
    options.unshift({value : "select","text" : "select"});
    return options;
  }
  getValue = () =>{
    const option = _.find(this.state.options, {'text' : this.state.value});
    if(option)  return option['value']
  }
  setValue = (e) =>{
    const option = _.find(this.state.options, (option) => {
      return option.value ==  e.target.value;
    });
    this.setState({ value: option.text });
    if( e.target.value == "select"){
      this.props.setValueToAnchor("empty");
      return;
    }
    this.props.setValueToAnchor(option.text);
  }
  onBlur(e){
    if( !this.props.showButtons ){
      this.setValue(e);
      this.props.onSubmit();
    }
  }
  getOptions(){
    if( this.props.options == null ) {
      throw("Please specify options for select element");
    }
    const options = this.props.options.map( option =>
      (<option value={option.value} key={option.value}>{option.text}</option>)
    );
    return options;
  }
  handleKeyDown(target) {
    if(target.keyCode == 13){
      this.setValue(target);
      this.props.onSubmit();
    }else if(target.keyCode == 27){
      this.props.setEditable(false)
    }
  }
  render(){
    return (
        <FormGroup controlId="formControlsSelect" validationState={this.props.validation.type} >
            {/*<ControlLabel>Label</ControlLabel>*/}
            <FormControl
                autoFocus
                componentClass="select"
                placeholder="select"
                bsSize="small"
                key={this.props.name}
                value={ this.getValue() }
                onChange={this.setValue.bind(this)}
                onBlur={this.onBlur.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
            >
              {this.getOptions()}
            </FormControl>
            {/*<FormControl.Feedback />*/}
            <HelpBlock>{this.props.validation.msg}</HelpBlock>
          </FormGroup>
        )
  }
}

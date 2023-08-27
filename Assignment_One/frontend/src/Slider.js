import React, { useState } from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const TestSlider = (props) => {

  const [ capacity, setValue ] = useState(0); 

  return (
    <RangeSlider
      value={capacity}
      tooltip='auto'
      max={70000}
      onChange={(event) => {
        setValue(event.target.value)
        props.setState(event)
    }
    }
    />
  );

};

export default TestSlider;
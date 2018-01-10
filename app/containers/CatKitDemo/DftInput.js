import React, { PropTypes } from 'react';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';
import { MdFileDownload } from 'react-icons/lib/md';
import { withStyles } from 'material-ui/styles';

import axios from 'axios';
import { backendRoot } from 'utils/constants';

const styles = (theme) => ({
  formControl: {
    margin: theme.spacing.unit,
  },
});


const initialState = {
  calculator: 'espresso',
  functional: 'PBE',
};

class DftInput extends React.Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.downloadDft = this.downloadDft.bind(this);
  }

  handleChange(name) {
    return (event) => {
      this.setState({
        [name]: event.target.value,
      });
    };
  }

  downloadDft() {
    const url = `${backendRoot}generate_dft/`;
    const params = {
      responseType: 'blob',
    };
    axios.get(url, params).then((response) => {
      const tempUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = tempUrl;
      link.setAttribute('download', 'dft_input.zip');
      document.body.appendChild(link);
      link.click();
    }).catch(() => {
    });
  }

  render() {
    return (
      <div>
        {typeof this.props.images === 'undefined' || this.props.images.length === 0 ? null :

        <div>
          <h2>Configure Calculator</h2>
          <form>
            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="calculator">Calculator:</InputLabel>
              <Select
                onChange={this.handleChange('calculator')}
                value={this.state.calculator}
              >
                <MenuItem value={'espresso'}>Quantum Espresso</MenuItem>
                <MenuItem value={'vasp'}>VASP</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={this.props.classes.formControl}>
              <InputLabel htmlFor="functional">XC-Functional</InputLabel>
              <Select
                value={this.state.functional}
                onChange={this.handleChange('functional')}
              >
                <MenuItem value="PBE">PBE</MenuItem>
                <MenuItem value="RPBE">RPBE</MenuItem>
                <MenuItem value="BEEF-vdW">BEEF-vdW</MenuItem>
              </Select>
            </FormControl>
            <Button raised onClick={this.downloadDft} color="primary"><MdFileDownload /> Download </Button>


          </form>
        </div>
        }
      </div>
    );
  }
}

DftInput.propTypes = {
  /* bulkCif: PropTypes.string.isRequired,*/
  images: PropTypes.array,
  classes: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(DftInput);

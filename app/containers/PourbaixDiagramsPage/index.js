/*
 *
 * PourbaixDiagramsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PeriodicTableSelector from 'containers/PeriodicTableSelector';
import PourbaixDiagramView from 'components/PourbaixDiagramView';
import Flexbox from 'flexbox-react';

export class PourbaixDiagramsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Flexbox flexDirection="column" minHeight="100vh">
        <h2>Periodic Table of Elements</h2>
        <PeriodicTableSelector />
        <PourbaixDiagramView />
      </Flexbox>
    );
  }
}

PourbaixDiagramsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = () => ({

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PourbaixDiagramsPage);

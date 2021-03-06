/**
 *
 * Publications
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { LinearProgress } from 'material-ui/Progress';
import { MdAddCircleOutline, MdPanoramaFishEye, MdViewList } from 'react-icons/lib/md';
import _ from 'lodash';
import ReactGA from 'react-ga';
import Script from 'react-load-script';
import Button from 'material-ui/Button';
import Paper from 'material-ui/Paper';
import Slide from 'material-ui/transitions/Slide';
import { FaExternalLink } from 'react-icons/lib/fa';

import { withStyles } from 'material-ui/styles';

import axios from 'axios';
import { newGraphQLRoot } from 'utils/constants';

import PublicationSystems from './publicationSystems';
// import PublicationReactions from './publicationReactions';

const styles = (theme) => ({
  publicationAction: {
    margin: theme.spacing.unit,
    height: 6,
    backgroundColor: _.get(theme, 'palette.sandhill.50'),
    '&:hover': {
      backgroundColor: _.get(theme, 'palette.sandhill.300'),
    },
  },
  outboundLink: {
    textDecoration: 'none',
  },
  publicationEntry: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  publicationYear: {
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  paper: {
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

const restoreSC = (str) => {
  let res = str;
  if (str === null || typeof str === 'undefined') {
    return '';
  }
  if (typeof str === 'object') {
    res = str.join(' ');
  }
  return res
    .replace('{\\o}', 'ø')
    .replace('\\o', 'ø')
    .replace('{"A}', 'Ä')
    .replace('{"U}', 'Ü')
    .replace('{"O}', 'Ö')
    .replace('{"a}', 'ä')
    .replace('{"u}', 'ü')
    .replace('{"o}', 'ö')
    .replace('{\\ss}', 'ß')
    .replace('--', '–')
    .replace('Norskov', 'Nørskov')

    .replace('{', '')
    .replace('}', '');
};

const prettyPrintReference = (ref) =>
  // TODO Integrate with crossref.org api
  // if (false && typeof ref.doi === 'undefined' || ref.doi === '') {
   (<span>
     {(ref.title !== '' && ref.title !== null && typeof ref.title !== 'undefined') ? <strong>{`"${restoreSC(ref.title)}"`}. </strong> : null }
     {(typeof ref.authors !== 'undefined' && ref.authors !== '' && ref.authors !== null) ? <span>{restoreSC(typeof ref.authors === 'string' ? JSON.parse(ref.authors).join('; ') : ref.authors.join('; '))}. </span> : null }
     {(ref.journal !== '' && typeof ref.journal !== 'undefined' && ref.journal !== null) ? <i>{ref.journal}, </i> : null }
     {(ref.volume !== '' && typeof ref.volume !== 'undefined' && ref.volume !== null) ? <span>{ref.volume} </span> : null}
     {(ref.year !== '' && typeof ref.year !== 'undefined' && ref.year !== null) ? <span>({ref.year}): </span> : null}
     {(ref.pages !== '' && typeof ref.pages !== 'undefined' && ref.pages !== null) ? <span>{ref.pages}. </span> : null}
   </span>);


class Publications extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      years: [],
      references: {},
      dois: {},
      titles: {},
      loading: false,
      openedPublication: null,
      systems: [],
      reactionEnergies: [],
      publicationQuery: '',
    };
    this.clickPublication = this.clickPublication.bind(this);
  }
  componentDidMount() {
    const yearQuery = '{publications { edges { node { year } } }}';
    axios.post(newGraphQLRoot, {
      query: yearQuery,
    })
      .then((response) => {
        let years = response.data.data.publications.edges.map((n) => n.node.year);
        years = [...new Set(years)].sort().reverse().filter((x) => x !== null);
        this.setState({
          years,
        });
        years.map((year) => {
          const query = `{publications (year: ${year}) { edges { node {  doi title year authors journal pages  } } }}`;
          return axios.post(newGraphQLRoot, {
            query,
          })
            .then((yearResponse) => {
              let references = yearResponse.data.data.publications.edges
                .map((n) => (n.node));
              references = [...new Set(references)];
              const dois = yearResponse.data.data.publications.edges.map((n) => (n.node.doi));

              const titles = yearResponse.data.data.publications.edges.map((n) => (n.node.title));

              const allReferences = this.state.references;
              const allDois = this.state.dois;
              const allTitles = this.state.titles;

              allReferences[year] = references;
              allDois[year] = dois;
              allTitles[year] = titles;

              this.setState({
                references: allReferences,
                dois: allDois,
                titles: allTitles,
              });
            })
            .catch(() => {
            })
          ;
        });
      });
  }
  clickPublication(event, target, key) {
    const splitKey = key.split('_');
    const year = parseInt(splitKey[1], 10);
    const count = parseInt(splitKey[2], 10);
    const title = (this.state.references[year][count]).title;
    /* reference = reference.split('"').join('\\"'); */
    this.setState({
      loading: true,
    });
    if (this.state.openedPublication === key) {
      this.setState({
        openedPublication: null,
      });
    } else {
      this.setState({
        openedPublication: key,
      });
    }
    this.setState({
      systems: [],
      reactionEnergies: [],
    });
    const query = `{
  publications(title: "${title}") {
    edges {
      node {
        title
        authors
        doi
        journal
        pages
        year
        systems {
          DftCode
          DftFunctional
          energy
          uniqueId
          Cifdata
          Formula
          Facet
          natoms
        }
      }
    }
  }
}
`;
    axios.post(newGraphQLRoot, { query })
      .then((response) => {
        const publication = [_.pick(response.data.data.publications.edges[0].node, ['title', 'year', 'doi', 'authors', 'journal', 'pages'])];
        if (response.data.data.publications.edges[0].node.systems.length > 0) {
          this.setState({
            systems: response.data.data.publications.edges[0].node.systems.map((system) => ({
              ...system,
              publication,
            })),
            loading: false,
            publicationQuery: query,
          });
        }
      });
  }

  render() {
    return (
      <div>
        <Script url="https://code.jquery.com/jquery-3.2.1.min.js" />
        <Script url="/static/ChemDoodleWeb.js" />
        <h1>Publications/Datasets</h1>

        {this.state.references === {} ? <LinearProgress color="primary" /> : null }
        {this.state.years.map((year, i) => (
          <Slide
            key={`slide_${i}`}
            in
            mountOnEnter
            unmountOnExit
            timeout={200 * i}
            direction="left"
          >
            <div>
              <Paper key={`div_year_${i}`} className={this.props.classes.paper}>
                {(this.state.references[year] || []).length === 0 ? null :
                <h2 key={`pyear_${year}`} className={this.props.classes.publicationYear}>{year}</h2>
                  }
                {(this.state.references[year] || [])
                      .filter((references, j) => (this.state.titles[year][j] !== null))
                      .map((reference, j) => (
                        <div key={`pli_${i}_${j}`} className={this.props.classes.publicationEntry}>
                          { this.state.openedPublication !== `elem_${year}_${j}` ?
                            <MdAddCircleOutline onClick={(target, event) => this.clickPublication(event, target, `elem_${year}_${j}`)} size={28} className={this.props.classes.publicationEntry} />
                            :
                            <MdPanoramaFishEye size={28} className={this.props.classes.publicationEntry} />
                          }
                          <span> &nbsp;&nbsp;&nbsp; </span>
                          <span className={this.props.classes.publicationEntry}>
                            {prettyPrintReference(reference)}

                          </span>
                          <Button onClick={(target, event) => this.clickPublication(event, target, `elem_${year}_${j}`)} className={this.props.classes.publicationAction}>
                            <MdViewList /> {'\u00A0\u00A0'}Load Data
                          </Button>
                          {(this.state.dois[year][j] === null
                            || typeof this.state.dois[year][j] === 'undefined'
                            || this.state.dois[year][j] === ''
                          ) ? null :
                          <ReactGA.OutboundLink
                            eventLabel={`http://dx.doi.org/${this.state.dois[year][j]}`}
                            to={`http://dx.doi.org/${this.state.dois[year][j]}`}
                            target="_blank"
                            className={this.props.classes.outboundLink}
                          >
                            <Button className={this.props.classes.publicationAction}>
                              <FaExternalLink />{'\u00A0\u00A0'} DOI: {this.state.dois[year][j]}.
                                </Button>
                          </ReactGA.OutboundLink>
                          }

                          <div>
                            { this.state.openedPublication !== `elem_${year}_${j}` ? null :
                            <span>
                              {this.state.loading === true ? <LinearProgress color="primary" /> : null}

                              {/*
                        true || this.state.reactionEnergies.length === 0 ? null :
                        <PublicationReactions {...this.state} />
                        */}
                              {this.state.systems.length === 0 ? null :
                              <PublicationSystems {...this.state} />
                        }
                            </span>
                            }
                          </div>
                          <br />
                        </div>
                      ))}
              </Paper>
            </div>
          </Slide>
          ))
        }
      </div>
    );
  }
}

Publications.propTypes = {
  classes: PropTypes.object,

};

export default withStyles(styles, { withTheme: true })(Publications);

/**
*
* YourNextApp
*
*/

import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Slide from 'material-ui/transitions/Slide';

const styles = (theme) => ({
  paper: {
    padding: theme.spacing.unit,
    marginTop: 3 * theme.spacing.unit,
    marginBottom: 3 * theme.spacing.unit,
  },
});


class YourNextApp extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Slide
        onMountEnter
        onUnmountExit
        in
        direction="left"
      >
        <div>
          <Paper className={this.props.classes.paper}>
            <h2>Your Next App</h2>
            <p>
          Start mocking up the interface for your next SUNCAT app in <code>app/components/YourNextApp/index.js</code>. Let&apos;s hang out on the <a href="https://slac-suncat.slack.com/messages/C75QBPDMF/">#catapp SLACK channel</a> if you have any questions!
          You will need a recent node version 8, and npm version 5 as a development environment.
        </p>
            <h2 id="install">Install</h2>
            <p>For local installation make a local clone of this repo</p>
            <pre><code>git clone https://github.com/mhoffman/CatAppBrowser.git</code></pre>
            <p>change into the repository and run</p>
            <pre><code>cd CatAppBrowser
        npm run setup # only first time
        npm run start</code></pre>
            <p>Open a browser at <code>http://localhost:3000/</code> to see it run.</p>
            <p>To run this you will need npm/node which is explained <a href="https://docs.npmjs.com/getting-started/installing-node">here</a>.</p>
          </Paper>
          <Paper className={this.props.classes.paper}>
            <h2 id="development">Development</h2>
            <p>The current interface is created from <a href="https://github.com/react-boilerplate/react-boilerplate">React Boilerplate</a>.</p>
            <h3 id="contributions">Contributions</h3>
            <p>Contributions in the form of pull requests are highly welcome. To this end you will need a <a href="https://github.com/join">github.com account (free)</a> and create a fork by clicking in the <a href="https://github.com/mhoffman/CatAppBrowser#fork-destination-box">Fork</a> in the upper-right corner. Clone your fork locally and commit your changes locally. Once you push them back to your public repository at github.com/[username]/CatAppBrowser you can create pull requests through the web interface. This will automatically spin up a new instance of the webapp for testing and staging purposes. Once we are happy with the candidate we can merge it into the live version.</p>
          </Paper>
          <Paper className={this.props.classes.paper}>
            <h3 id="adding-new-appscomponents">Adding New Apps/Components</h3>
            <p>To add a new component simply run</p>
            <pre><code>npm run generate component</code></pre>
            <p>Give it a succinct name and follow the default choices. This will create a new folder under <code>app/components/</code> with all the needed files. The new component can be readily imported and used throughout the app.</p>
            <h3 id="add-new-appscontainers">Add New Apps/Containers</h3>
            <p>For more complex applications, i.e. requiring several levels of user interface and user choice, you should go right a ahead and create a container. For intermittently storing user choices you will likely need <a href="https://github.com/reactjs/react-redux">React Redux</a>. If that sounds scary and complex, don&apos;t worry. Still start mocking up the user interface and we can talk about getting &apos;interactivity&apos; into it later.</p>
          </Paper>
          <Paper className={this.props.classes.paper}>
            <h2 id="dependencies">Dependencies</h2>
            <ul>
              <li>Graphs are created with <a href="http://mpld3.github.io/">mpld3</a></li>
              <li>React v15 (will be updated to 16 soon) React is a powerful JavaScript library that is actively developed by Facebook. With some background in HTML and a little bit of JavaScript one can quite far. There are a ton of <a href="https://reactjs.org/tutorial/tutorial.html">tutorials</a> out there.</li>
            </ul>
            <h2 id="ui-development">UI Development</h2>
            <ul>
              <li>This project uses <a href="http://www.material-ui.com/#/components/slider">Material UI</a> Component throughout.</li>
            </ul>
            <h2 id="development-1">Development</h2>
            <ul>
              <li><p>To commit javascript code, it has to pass the ESLint linter. The linter may seem a little pesky at first, but I promise it makes your code look great and lets&apos;s us focus on bigger code design issues. Some issues can be fixed automatically by running <code>./node_modules/eslint/bin/eslint.js --fix &lt;filename&gt;</code></p></li>
              <li><p>For testing we rely on <a href="https://facebook.github.io/jest/docs/en/more-resources.html">Jest</a> and <a href="https://travis-ci.org/mhoffman/CatAppBrowser">Travis CI</a>. Please have a look a Jest and write some simple test. Test coverage should eventually go up.</p></li>
            </ul>
          </Paper>
        </div>
      </Slide>
    );
  }
}

YourNextApp.propTypes = {
  classes: PropTypes.object,

};

export default withStyles(styles, { withTheme: true })(YourNextApp);

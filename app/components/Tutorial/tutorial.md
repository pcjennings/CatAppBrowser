
# Developer Guide

## Motivation 

The purpose of this tutorial is to explain the architecture of the CatApp project and to give a quick start into implementing new features and applications. The project largely builds and tried and tested standard components and language. So the style of this tutorial won't go to much into reverberating implementation techniques but rather give a high-level overlook into how different parts work together and where to find more information. Furthermore, a focus is put on practical tips and tricks that help to accelerate common tasks.

### Prequisites

#### Conceptually

Some previous exposure in Python, JavaScript, HTML, CSS, SQL (sqlalchemy), GraphSQL, HTTP Server programming will be hugely helpful but even just a partial understanding in two or three of this catchwords or frankly programming language should be enough to figure out the in and outs and connect the different parts.


#### Technically

Python 2.7+, 3.6+, npm, node, pip, virtualenv, a text editor. Since the project relies on Python and javascript as runtime environments we will need both installed. Depending on your operating system and package manager there are many different ways of installing those. For reference current developing is done with npm 5.6.0, node 8.9.1, and Python 3.6 for the backend. 


Finally, do yourself a favor and use a decent text editor that actively supports you in implementing code. The key here is to pick one, master it, and stick to it. If you already found a text editor you like, please keep using it. If you haven't done so have a look at vim, emacs, sublime text, or Atom in no particular order and pick one.

The project is divided into a backend-component (CatAppBackend),
a frontend component (CatAppBrowser) and a script component (CatAppCLI).

## Backend: CatAppBackend

### Routing

The backend routing scheme looks as follows:

          /
          -- /graphql
          -- /apps/
          ---- /activityMaps/
          ---- /scalingRelations/

### GraphQL

TODO

### Apps

TODO

---

**Tip**: `jq` is a neat little command line tool for processing JSON data on the command line in spirit very similar to `sed` for defining complex transformation rules. A highly useful feature is to pretty-print a stream of JSON like so

        curl http://projectname.org | jq '.'

---

## Frontend: React

### Why JavaScript?

If you are the typical theory minded chemical engineer/physicist/chemist the prospect of learning a little JavaScript most likely sounds very much like a nuisance. You probably have a little Python and Bash and some other compiled language under your belt like C, C++, Fortran. And now JavaScript!? Isn't that like Java, just worse? (No) Doesn't it only run in browser? What's with all the brackets? I don't like the syntax! Don't I have a learn every bug of every browser? Isn't it super slow? 

Those are all valid concerns. It is difficult to dispel all of them at the same time and I won't try to turn a complete JavaScript sceptic into a JavaScript lover, but I want to invite you to judge a programming language not only by its core feature such as syntax. If you spend a second to look beyond that and consider things like platform, community ecosystem, packaging, package management, distribution, execution model, you are quick to realize that JavaScript is in fact one of the more exciting languages these days. 

Yes, it had a horrible start running (slowly) with many different implementations and a lot of idiosyncracies built in. Over time however several key development have very much changed this 'core' feature. With the initial release of jQuery (~2006) a lot of effort has gone into standardizing the language and its execution. jQuery has acted as a sort of compatibility layer between different browsers and version, helping that one version of code runs quite reliably across many browsers, operating systems, and versions. The other key development can be attributed to Node.js (~2009). Node.js is written in C++ and allows to execute JavaScript without a browser on the server-side. Node.js can be effectively thought of as interpreter very much like the Python interpreter: you can write scripts, run them, just a different ecosystem of libraries and tool :-). Having a bit of JS under the belt mean you can write code that runs on every laptop, tablet, or smart phone and can be easily distributed by plugging a URL into a browser window. Furthermore, it has a very large and growing ecosystem of developers, tool, and libraries.

So, nuff said, why not give it a try?


### Project Structure

The basic layout of the frontend project accounting
for all files and directories that need to be typically
touched for implementing new features, looks as follows:

        /app # All programming logic
          /components # Reusable blocks w/o state
          /containers #  Bigger app blocks w/ state
          /utils
            /constants.js #  global constants like URLs
            /theme.js # Global app style
        /internals # File config settings and generators
        /routes.js # Mapping between URL input and components

Most of the additional code goes into a corresponding folder in either `app/components` or `app/containers`. These folders are structured such that new components can be dropped in to the project and code-coupling with other components is minimal. Unit tests go into each folder pertaining to the component. If you think about building a bigger feature such as a little single-page page app with one or more form fields, a diagram, and a component showing a slab you should probably right away start by creating a new container. If you want to build a small component that can be used throughout the frend, that should probably go into `components`. The will then automatically go into the corresponding sub-folder along with a subdirectory for unit test (`./tests`). Each folder should thought of one functional component that can be submitted (and maintained) using version control.

To wire up a URL typed into the address bar (or a clicked linked) with content shown, you need to look into `routes.js`. To define a new top level URL type

        npm run generate route

It will ask you for the URL and the component (or container) that should be shown. The generator is just a handy short hand. Details can always be adjusted later.  A route may also contain dynamic parts like `/component/:var1/:var2`, which can be processed as a variable in the corresponding component as `this.props.routeParams`. The `/containers/Profile/index.js` container illustrates this technique. URLs can be changed quite flexibly, but the [immortal words](https://www.w3.org/Provider/Style/URI) of the [web developer](https://twitter.com/vasusrini/status/516649874205716481) still count. 

### Component and Containers


As mentioned above, there are two types sub-directores: components and containers. The idea is to make code organization easier once the code base grows. If you like inside them both declare objects that are derived from `React.Component`. However, the container can actively manipuplate the global app state while components should not. Containers use Redux interact with the app state, while components do not change state. They still contain a little bit of state to reflect graphical interaction that are immediately visible to the user but there is no expectation that they are accesible from a different form or component. Again, if this is all confusing hub-bub, you might probably start with a `container`. You can always delete the corresponding files and hooks later to turn it into a component.
TODO

### State and props

Much of the programming flow of a React app is that each component has props and state . You can think of them like read-only (or parameters) and read-and-write variables of a function. Props are always passed in from other component upon invocation, while state maybe changed by each component (using `this.setState(...)`). If you wonder about the point of props if you cannot change them: you can influence what a compoent looks like by calling it with different props. State on the other hand can be thought of more like a traditional variable in programming

TODO

### JSX

JSX is one of the essential features of the React framework. It is a neat little syntax that essentially looks like HTML but allows to write little snippets of nested javascript code blocks that declare the user interface. It allows to seamlessly mix HTML Tags with user-defined Tags representing React components. A small block of JSX might look as follows:

      <div>
      <h1>Hi</h1>
      <div>Welcome to this snippet! More to follow.</div>
      </div>

But upon defining a React Component like so

      class Welcome extends React.Component {
        render() {
          return (
            <div>Welcome to this snippet! More to follow.</div>
          );
        }
      }

we can re-use this component directly in some other block, like so:

      <div>
      <h1>Hi</h1>
      <Welcome />
      </div


Neat, isn't it? It allows us to very easily write re-usable components in a declarative fashion and use them throughout our project. Click [here](https://reactjs.org/docs/introducing-jsx.html) for further reading.

---

**Tip**: The project repository has some pre-commit hooks that will automatically a linter again every javascript file that is about to be commited to git history. The `eslint` linter is quite picky but ensures a consistent coding style across the project. So let's all stick to and keep the code readable. Not all but some glitches can be fitched automatically inplace with manual intervention. The following `alias`

        alias ae='./node_modules/eslint/bin/eslint.js --fix'

allows to automatically fix many issues when run from the root of the project like so

        ae app/components/<ComponentName>/<script.js>


It will all issues it can fix by itself and report any remaining ones.

---

### Redux Quickstart

As apps or even parts of apps grow more complex in functionality storing and keeping track of the apps state becomes crucial. The recommended way of managing state in this project is [redux](https://redux.js.org/) which stores the whole app state in one central store object. There are many great online discussions on best practices. The learning curve can be a little steep initially. Fully, subscribing to learning by doing, we will simply do a quick start type guide touching upon all essential steps in setting up a `action -> reducer -> props` cycle. We assume that we created a container with

        npm run generate container

with setting as follows:

      ? What should it be called? TestContainer
      ? Select a base component: Component
      ? Do you want headers? No
      ? Do you want an actions/constants/selectors/reducer tuple for this container? Yes
      ? Do you want sagas for asynchronous flows? (e.g. fetching data) No
      ? Do you want i18n messages (i.e. will this component use text)? No
      ? Do you want Material UI styling? Yes

The basic steps for every user interaction are as follows:

- identify user action
- declare a corresponding constant in `./constants.js`
- declare a payload action in `./actions.js` to filter the state changing information 
- declare a reducer that describes how the payload interaction changes the corresponding app state in `./reducers.js`
- hook the container reducer into the global app store in `/app/reducers.js`.

The first step is to identify every user action as starting point for changing the app state.



### Styling


For websites the established way of declaring how the interface looks is very efficienly done with CSS. One main goal here is to keep content and presentation apart. Using the Material UI a lot of styling automatically gives a consistent look. If custom styling becomes necessary, the Material UI still provides a very nice way of concisely using a CSS Style syntax for every component while keeping the content apart from its presentation or styling. The recommended way is as follows:

In the `import` section at the top of a component we import the styling wrapper

    import { withStyles } from 'material-ui/styles';

Below the imports but above the `React.Component` we declare custom styles using classes like so

    const styles = (theme) => ({
      <customClassName>: {
        color: '#fff',
        textDecoration: 'underline',
        [theme.breakpoints.down('lg')]: {
          visibility: 'hidden',
          display: 'none',
        },
        ...
      }
    })


The sub-block containing `theme.breakpoints.down('...')` demonstrates
how to make styling different depending on screen size. This can be quite
handy to make the app **responsive**, which means no less that the user interface
is usable on every screen size (e.g. desktop, tablet, mobile, TV.)

Having defined such a style named `<customClassName>` we can assign it to any JSX block like, so:

      <div className={this.props.classes.<CustomClassName>}>
      ...
      </div>


Now there are only to minor changes left. First we declare the classes prop type.

      ExampleComponent.propTypes = {
        classes: PropTypes.object,
      }

Second, we tie the newly defined styles to component

      export default withStyles(styles, { withTheme: true })(ExampleComponent);

### Graphs with Plotly React Component


### Atomic Geometries with ChemDoodle Web

### Testing

Finally, let's talk a moment about testing and continuous integration with Jest

TODO


## CLI scripts
The CLI script collection contains mostly Python scripts and is supposed to simplify common operations. The idea is to run this on many different server environments.

import { connect } from "react-redux";

import { locationChange } from "../store/actions/history";

import App from "../components/App";

const mapStateToprops = ({ user, auth, history }) => ({ user, auth, locations: history.locations });
const mapDispatchToProps = { locationChange };

export default connect(mapStateToprops, mapDispatchToProps)(App);

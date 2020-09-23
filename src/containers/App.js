import { connect } from "react-redux";

import { logout } from "../store/actions/user";

import App from "../components/App";

const mapStateToprops = ({ user, auth }) => ({ user, auth });

const mapDispatchToProps = { logout };

export default connect(mapStateToprops, mapDispatchToProps)(App);

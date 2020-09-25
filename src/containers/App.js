import { connect } from "react-redux";

import App from "../components/App";

const mapStateToprops = ({ user, auth }) => ({ user, auth });

export default connect(mapStateToprops)(App);

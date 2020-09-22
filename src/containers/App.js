import { connect } from "react-redux";

import App from "../components/App";

const mapStateToprops = ({ user }) => ({ user });

export default connect(mapStateToprops)(App);

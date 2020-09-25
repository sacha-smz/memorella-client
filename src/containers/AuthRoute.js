import { connect } from "react-redux";

import AuthRoute from "../components/AuthRoute";

const mapStateToprops = ({ auth }) => ({ auth });

export default connect(mapStateToprops)(AuthRoute);

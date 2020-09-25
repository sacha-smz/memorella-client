import { connect } from "react-redux";

import AdminRoute from "../components/AdminRoute";

const mapStateToprops = ({ user, auth }) => ({ user, auth });

export default connect(mapStateToprops)(AdminRoute);

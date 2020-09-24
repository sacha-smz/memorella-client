import { connect } from "react-redux";

import { getUserWithAlerts } from "../store/selectors/user";
import { signinFormSubmit, clearSigninError } from "../store/actions/user";

import SigninForm from "../components/SigninForm";

const mapStateToprops = state => ({ user: getUserWithAlerts("signin")(state), auth: state.auth });
const mapDispatchToProps = { signinFormSubmit, clearSigninError };

export default connect(mapStateToprops, mapDispatchToProps)(SigninForm);

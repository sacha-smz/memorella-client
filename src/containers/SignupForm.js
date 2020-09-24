import { connect } from "react-redux";

import { getUserWithAlerts } from "../store/selectors/user";
import { signupFormSubmit, clearSignupError } from "../store/actions/user";

import SignupForm from "../components/SignupForm";

const mapStateToprops = state => ({ user: getUserWithAlerts("signup")(state) });
const mapDispatchToProps = { signupFormSubmit, clearSignupError };

export default connect(mapStateToprops, mapDispatchToProps)(SignupForm);

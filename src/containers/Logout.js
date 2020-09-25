import { connect } from "react-redux";

import { logout } from "../store/actions/user";

import Logout from "../components/Logout";

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(Logout);

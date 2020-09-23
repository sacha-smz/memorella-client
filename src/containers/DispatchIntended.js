import { connect } from "react-redux";

import DispatchIntended from "../components/DispatchIntended";

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatchIntended: () => dispatch(ownProps.intended)
});

export default connect(null, mapDispatchToProps)(DispatchIntended);

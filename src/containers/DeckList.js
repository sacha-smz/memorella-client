import { connect } from "react-redux";

import { fetchDecks } from "../store/actions/deck";

import DeckList from "../components/DeckList";

const mapStateToProps = ({ deck }) => ({ deck });
const mapDispatchToProps = { fetchDecks };

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);

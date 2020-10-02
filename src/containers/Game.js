import { connect } from "react-redux";

import { fetchDecks } from "../store/actions/deck";

import Game from "../components/Game";

const mapStateToProps = ({ deck }) => ({ decks: deck.list });
const mapDispatchToProps = { fetchDecks };

export default connect(mapStateToProps, mapDispatchToProps)(Game);

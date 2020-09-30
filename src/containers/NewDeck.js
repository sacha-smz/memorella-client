import { connect } from "react-redux";

import { fetchDeck, deckSubmit } from "../store/actions/deck";

import NewDeck from "../components/NewDeck";

const mapStateToProps = ({ deck }) => ({ decks: deck.list });
const mapDispatchToProps = { fetchDeck, deckSubmit };

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);

import { connect } from "react-redux";

import { deckSubmit } from "../store/actions/deck";

import NewDeck from "../components/NewDeck";

const mapDispatchToProps = { deckSubmit };

export default connect(null, mapDispatchToProps)(NewDeck);

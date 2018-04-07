import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import mapStateToSelectors from './map-state-to-selectors'

export default function magicConnect({ selectors, actionCreators }) {
	return connect(
		selectors ?
			mapStateToSelectors(selectors) :
			null,
		actionCreators ?
			_.partial(bindActionCreators, actionCreators) :
			null
	)
}

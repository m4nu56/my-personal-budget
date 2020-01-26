import {CATEGORIES_DATA, DASHBOARD_DATA, IMPORTED_BANK_DATA} from '../constants/actions';

const initialState = {
  dashboardData: [],
  importedBankData: []
}

// Redux reducer added to the react-admin project.
// On peut ajouter nos propres reducer pour nos propres actions métier synchrones ici
// Pour les asynchrones on utilisera les sagas
function rootReducer (previousState = initialState, action) {

  if (action.type === DASHBOARD_DATA) {
    return Object.assign({}, previousState, {
      dashboardData: action.payload
    })
  }
  if (action.type === CATEGORIES_DATA) {
    return Object.assign({}, previousState, {
      categories: action.payload.data
    })
  }
  if (action.type === IMPORTED_BANK_DATA) {
    return Object.assign({}, previousState, {
      importedBankData: action.payload
    })
  }
  if (action.type === 'increment-counter') {
    return Object.assign({}, previousState, {
      count: previousState.count != null ? ++previousState.count : 0
    })
  }

  return previousState;
}

export default rootReducer

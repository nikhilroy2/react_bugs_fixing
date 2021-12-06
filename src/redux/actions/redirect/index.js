import * as actionTypes from '../../types/redirect';

export const redirectNotFound = (error) => ({ type: actionTypes.NOT_FOUND, error });

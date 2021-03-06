import { createSelector } from '@ngrx/store';

import { Defendant } from '@app/core/models/asset/asset-properties/defendant.model';
import * as fromFeature from '../reducers';
import * as fromDefendants from '../reducers/defendants.reducer';

import * as fromAssets from './assets.selectors';

export const getDefendantsState = createSelector(
  fromFeature.getCoreState,
  (state: fromFeature.CoreState) => state.defendants
);

const getDefendantsEntitiesAsInterfaces = createSelector(getDefendantsState, fromDefendants.getDefendantsEntities);

export const getDefendantsEntities = createSelector(
  getDefendantsEntitiesAsInterfaces,
  fromAssets.getAssetsEntities,
  (aDefendants, aAssetEntities) => {
    const theDefendants = Object.assign({}, aDefendants);

    Object.keys(theDefendants).map((aKey) => {
      const theDefendant = new Defendant(theDefendants[aKey]);
      theDefendant.setAsset(aAssetEntities[theDefendant.getAssetId()]);

      theDefendants[aKey] = theDefendant;
    });

    return theDefendants;
  }
);

export const getAllDefendants = createSelector(
  getDefendantsEntities,
  (entities: Defendant[]) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);
export const getAllDefendantsForAssetId = (aAssetId: number) => createSelector(
  getAllDefendants,
  (aDefendants) => aDefendants.filter(aDefendant => aDefendant.getAssetId() === +aAssetId)
);

export const getDefendantsLoaded = createSelector(getDefendantsState, fromDefendants.getDefendantsLoaded);
export const getDefendantsLoadedForAssetId = (aAssetId: number) => createSelector(
  getDefendantsLoaded,
  (aLoaded) => aLoaded[aAssetId] || false
);

export const getDefendantsLoading = createSelector(getDefendantsState, fromDefendants.getDefendantsLoading);
export const getDefendantsLoadingForAssetId = (aAssetId: number) => createSelector(
  getDefendantsLoading,
  (aLoading) => aLoading[aAssetId] || false
);

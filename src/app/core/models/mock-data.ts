import * as moment from 'moment';

import { Asset, AssetResponse, Solution } from './';
import { PrecautionaryMeasureResponse } from './precautionary-measure-response.interface';

const firstAsset = new Asset();
firstAsset.fromAssetResponseJson({
  assetId: 1,
  assetName: 'First asset',
  assetIdentifier: 'A1',
  estimatedAmount: 100,
  estimatedAmountCurrency: 'EUR',
  assetCategory: 'Category',
  assetSubcategory: 'Subcategory',
  currentStage: 'Stage',
} as AssetResponse);

const secondAsset = new Asset();
secondAsset.fromAssetResponseJson({
  assetId: 2,
  assetName: 'Second asset',
  assetIdentifier: 'A2',
  estimatedAmount: 110,
  estimatedAmountCurrency: 'EUR',
  assetCategory: 'Category',
  assetSubcategory: 'Subcategory',
  currentStage: 'Stage',
} as AssetResponse);

export const assets: Asset[] = [
  firstAsset,
  secondAsset,
];

export const detailedAsset: Asset = new Asset();
detailedAsset.fromAssetDetailResponseJson({
  id: 3,
  name: 'First asset',
  description: 'First asset description',
  subcategoryId: 6,
  identifier: 'A1',
  remarks: 'remarks',
  stageId: 1,
  quantity: 1,
  measureUnit: 'buc',
  estimatedAmount: 100,
  estimatedAmountCurrency: 'EUR',
  journal: {
    addedDate: '2018-08-29T11:14:53.833Z',
    userCodeAdd: 'bogdan',
    lastChangeDate: '2018-08-29T11:14:53.833Z',
    userCodeLastChange: 'bogdan',
  },
});

const firstSolution = new Solution({
    id: 1,
    stageId: 1,
    decisionId: 1,
    institutionId: 1,
    decisionDate: moment('2018-01-01').format(),
    decisionNumber: '1',
    confiscationDetails: {
      recoveryBeneficiaryId: 1,
    },
    sequesterDetails: {
      precautionaryMeasureId: 1,
    },
    recoveryDetails: {
      actualAmount: 1000,
      actualAmountCurrency: 'eur',
      estimatedAmount: 1100,
      estimatedAmountCurrency: 'eur',
      recoveryState: 'recovered',
      evaluationCommittee: {
        evaluationCommitteeDesignationDate: moment('2018-01-01').format(),
        evaluationCommitteePresident: 'President',
        evaluationCommitteeMembers: 'Members',
      },
      recoveryCommittee: {
        recoveryCommitteeDesignationDate: moment('2018-01-01').format(),
        recoveryCommitteePresident: 'President',
        recoveryCommitteeMembers: 'Members',
      },
      lastActivity: moment('2018-01-02').format(),
      personResponsible: 'Person responsible',
    },
    solutionDetails: {
      source: 'source',
      sentOnEmail: true,
      fileNumber: '1',
      fileNumberParquet: '1',
      receivingDate: moment('2018-01-02').format(),
      isDefinitive: true,
      definitiveDate: moment('2018-01-03').format(),
      sentToAuthoritiesDate: moment('2018-01-04').format(),
      crimeTypeId: 1,
      legalBasis: 'legal basis',
    },
    journal: {
      addedDate: moment('2018-01-01').format(),
      userCodeAdd: 'admin',
      userCodeLastChange: moment('2018-01-04').format(),
      lastChangeDate: moment('2018-01-04').format(),
    },
  });
firstSolution.setAsset(firstAsset);

const secondSolution = new Solution({
    id: 2,
    stageId: 2,
    decisionId: 2,
    institutionId: 2,
    decisionDate: moment('2018-02-01').format(),
    decisionNumber: '2',
    confiscationDetails: {
      recoveryBeneficiaryId: 2,
    },
    sequesterDetails: {
      precautionaryMeasureId: 2,
    },
    recoveryDetails: {
      actualAmount: 2000,
      actualAmountCurrency: 'eur',
      estimatedAmount: 2100,
      estimatedAmountCurrency: 'eur',
      recoveryState: 'recovered',
      evaluationCommittee: {
        evaluationCommitteeDesignationDate: moment('2018-02-01').format(),
        evaluationCommitteePresident: 'President',
        evaluationCommitteeMembers: 'Members',
      },
      recoveryCommittee: {
        recoveryCommitteeDesignationDate: moment('2018-02-01').format(),
        recoveryCommitteePresident: 'President',
        recoveryCommitteeMembers: 'Members',
      },
      lastActivity: moment('2018-02-02').format(),
      personResponsible: 'Person responsible',
    },
    solutionDetails: {
      source: 'source',
      sentOnEmail: true,
      fileNumber: '2',
      fileNumberParquet: '2',
      receivingDate: moment('2018-02-02').format(),
      isDefinitive: true,
      definitiveDate: moment('2018-02-03').format(),
      sentToAuthoritiesDate: moment('2018-02-04').format(),
      crimeTypeId: 2,
      legalBasis: 'legal basis',
    },
    journal: {
      addedDate: moment('2018-02-01').format(),
      userCodeAdd: 'admin',
      userCodeLastChange: moment('2018-02-04').format(),
      lastChangeDate: moment('2018-02-04').format(),
    },
  });
secondSolution.setAsset(secondAsset);

const thirdSolution = new Solution({
    id: 3,
    stageId: 3,
    decisionId: 3,
    institutionId: 3,
    decisionDate: moment('2018-03-01').format(),
    decisionNumber: '3',
    confiscationDetails: {
      recoveryBeneficiaryId: 3,
    },
    sequesterDetails: {
      precautionaryMeasureId: 3,
    },
    recoveryDetails: {
      actualAmount: 3000,
      actualAmountCurrency: 'eur',
      estimatedAmount: 3100,
      estimatedAmountCurrency: 'eur',
      recoveryState: 'recovered',
      evaluationCommittee: {
        evaluationCommitteeDesignationDate: moment('2018-03-01').format(),
        evaluationCommitteePresident: 'President',
        evaluationCommitteeMembers: 'Members',
      },
      recoveryCommittee: {
        recoveryCommitteeDesignationDate: moment('2018-03-01').format(),
        recoveryCommitteePresident: 'President',
        recoveryCommitteeMembers: 'Members',
      },
      lastActivity: moment('2018-03-02').format(),
      personResponsible: 'Person responsible',
    },
    solutionDetails: {
      source: 'source',
      sentOnEmail: true,
      fileNumber: '3',
      fileNumberParquet: '3',
      receivingDate: moment('2018-03-02').format(),
      isDefinitive: true,
      definitiveDate: moment('2018-03-03').format(),
      sentToAuthoritiesDate: moment('2018-03-04').format(),
      crimeTypeId: 3,
      legalBasis: 'legal basis',
    },
    journal: {
      addedDate: moment('2018-03-01').format(),
      userCodeAdd: 'admin',
      userCodeLastChange: moment('2018-03-04').format(),
      lastChangeDate: moment('2018-03-04').format(),
    },
  });
thirdSolution.setAsset(secondAsset);

export const solutions: Solution[] = [
  firstSolution,
  secondSolution,
  thirdSolution,
];

export const precautionaryMeasures: PrecautionaryMeasureResponse[] = [
  {
    id: 1,
    measureType: 1,
    name: 'Confiscare speciala',
  } as PrecautionaryMeasureResponse,
  {
    id: 2,
    measureType: 2,
    name: 'Amenda penala',
  } as PrecautionaryMeasureResponse,
  {
    id: 3,
    measureType: 3,
    name: 'Despagubiri acordate statului',
  } as PrecautionaryMeasureResponse,
];

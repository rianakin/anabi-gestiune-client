import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Asset,
  AssetsService,
  AssetCurrency,
  AssetMeasurement,
  Category,
  Decision,
  Institution,
  Solution,
  Stage,
  StorageSpace
} from '@app/core';
import { take } from 'rxjs/operators';

import * as fromStore from '@app/core/store';
import { AssetProperty } from '@app/core/store/actions/asset-properties.action';
import { select, Store } from '@ngrx/store';

import { combineLatest, Observable } from 'rxjs';

export enum AssetProperties {
  SOLUTIE = 'solutie',
  INCULPAT = 'inculpat',
  SPATIU = 'spatiu',
}

export enum AssetDetailState {
  View = 'view',
  Edit = 'edit',
}

@Component({
  templateUrl: 'asset-detail.component.html',
  styleUrls: ['asset-detail.component.scss'],
})
export class AssetDetailComponent implements OnInit {
  private asset$: Observable<Asset>;
  private institutions$: Observable<Institution[]>;
  private decisions$: Observable<Decision[]>;
  private stages$: Observable<Stage[]>;
  private assetProperty$: Observable<fromStore.AssetProperty>;

  private categories$: Observable<Category[]> = this.store.pipe(select(fromStore.getAssetParentCategories));
  private subcategories$: Observable<Category[]>;
  private measurements: AssetMeasurement[];
  private currencies: AssetCurrency[];

  private state: AssetDetailState = AssetDetailState.View;

  properties = [
    { name: 'Solutie', value: AssetProperties.SOLUTIE },
    { name: 'Inculpat', value: AssetProperties.INCULPAT },
    { name: 'Spatiu', value: AssetProperties.SPATIU },
  ];
  selectedProperty: string;

  constructor(
    private store: Store<fromStore.CoreState>,
    private route: ActivatedRoute,
    private assetsService: AssetsService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((aParams: any) => {
      const theId = aParams.assetId;

      this.asset$ = this.store.pipe(select(fromStore.getAssetById(theId)));
      this.assetProperty$ = this.store.pipe(select(fromStore.getAssetPropertiesByAssetId(theId)));
      this.institutions$ = this.store.pipe(select(fromStore.getAllInstitutions));
      this.decisions$ = this.store.pipe(select(fromStore.getAllDecisions));
      this.stages$ = this.store.pipe(select(fromStore.getAllStages));
    });

    this.asset$.pipe(take(1))
      .subscribe((aAsset: Asset) => this.getSubcategories(aAsset.category.id));

    this.assetsService.measurements()
      .pipe(take(1))
      .subscribe(
        (measurements) => this.measurements = measurements
      );
    this.assetsService.currencies()
      .pipe(take(1))
      .subscribe(
        (currencies) => this.currencies = currencies
      );
  }

  getSubcategories(categoryId) {
    this.subcategories$ = this.store.pipe(select(fromStore.getAssetSubcategories(categoryId)));
  }

  isEditingAssetProperty$(): Observable<boolean> {
    return combineLatest(
      this.asset$,
      this.assetProperty$,
      (aAsset, aAssetProperty) => aAsset !== undefined && aAssetProperty !== undefined
    );
  }

  addProperty() {
    switch (this.selectedProperty) {
      case AssetProperties.SOLUTIE: {
        this.asset$.subscribe((aAsset: Asset) => {
          const theSolution = new Solution();
          theSolution.setAsset(aAsset);
          this.store.dispatch(new fromStore.UpdateProperty(theSolution));
        });
        break;
      }

      case AssetProperties.SPATIU: {
        this.asset$.subscribe((aAsset: Asset) => {
          const theSpace = new StorageSpace();
          theSpace.setAsset(aAsset);
          this.store.dispatch(new fromStore.UpdateProperty(theSpace));
        });
        break;
      }
    }

    this.resetSelectedProperty();
  }

  editAsset() {
    this.setStateEdit();
  }

  onPropertyUpdate(aProperty: AssetProperty) {
    this.store.dispatch(new fromStore.UpdateProperty(aProperty));
  }

  onPropertyCancel(aProperty: AssetProperty) {
    this.store.dispatch(new fromStore.DeleteProperty(aProperty.getAsset().id));
  }

  onPropertySave(aProperty: AssetProperty) {
    this.store.dispatch(new fromStore.CreateProperty(aProperty));
  }

  onEditAsset(aAsset: Asset) {
    this.store.dispatch(new fromStore.UpdateAsset(aAsset));
    this.setStateView();
  }

  onCancelAssetEdit() {
    this.setStateView();
  }

  private resetSelectedProperty() {
    this.selectedProperty = undefined;
  }

  private setStateEdit() {
    this.state = AssetDetailState.Edit;
  }

  private setStateView() {
    this.state = AssetDetailState.View;
  }

  isStateView(): boolean {
    return this.state === AssetDetailState.View;
  }

  isStateEdit(): boolean {
    return this.state === AssetDetailState.Edit;
  }
}

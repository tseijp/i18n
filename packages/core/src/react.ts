import { useSyncExternalStore } from 'react';
import { i18n } from ".";
import { I18N } from './types'
import { getSnapshotLng, subscribeLng } from './utils';

const getServerSnapshot = () => '';
export const useTranslation = <
  Lng extends string = string,
  Ids extends string = string,
>(
  self = i18n as unknown as I18N<Lng, Ids>,
) => {
  useSyncExternalStore(subscribeLng, getSnapshotLng, getServerSnapshot)
  return self;
};
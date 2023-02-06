import { EntityType } from './entityType';
import { IFavorites } from './favs,interface';

export interface IFavsStorage {
  findAll: () => IFavorites;
  add: (type: EntityType, entityId: string) => string;
  delete: (type: EntityType, entityId: string) => string;
}

import Orphanage from '../models/Orphanage';
import ImagesView from './images_view';

/* eslint-disable camelcase */
interface ViewObject {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: {
    id: string;
    url: string;
  }[];
}

export default {
  render(orphanage: Orphanage): ViewObject {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: ImagesView.renderMany(orphanage.images),
    };
  },

  renderMany(orphanages: Orphanage[]): ViewObject[] {
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};

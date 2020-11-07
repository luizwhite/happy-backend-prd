import Image from '../models/Image';

interface ViewObject {
  id: string;
  url: string;
}

export default {
  render(image: Image): ViewObject {
    return {
      id: image.id,
      url: `${process.env.API_URL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]): ViewObject[] {
    return images.map((image) => this.render(image));
  },
};

import type { Schema, Struct } from '@strapi/strapi';

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    description: Schema.Attribute.Text;
    fullname: Schema.Attribute.Component<'shared.user-field', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedUserField extends Struct.ComponentSchema {
  collectionName: 'components_shared_user_fields';
  info: {
    displayName: 'userField';
  };
  attributes: {
    fullname: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.hero': SharedHero;
      'shared.user-field': SharedUserField;
    }
  }
}

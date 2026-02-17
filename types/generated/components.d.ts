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

export interface SharedTest extends Struct.ComponentSchema {
  collectionName: 'components_shared_tests';
  info: {
    displayName: 'test';
  };
  attributes: {};
}

export interface SharedUploader extends Struct.ComponentSchema {
  collectionName: 'components_shared_uploaders';
  info: {
    displayName: 'uploader';
    icon: 'bulletList';
  };
  attributes: {
    file: Schema.Attribute.Media<'files'>;
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

export interface ThemeUi extends Struct.ComponentSchema {
  collectionName: 'components_theme_uis';
  info: {
    displayName: 'ui';
  };
  attributes: {
    colourPicker: Schema.Attribute.String &
      Schema.Attribute.CustomField<'plugin::color-picker.color'>;
    primaryBorderColor: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.hero': SharedHero;
      'shared.test': SharedTest;
      'shared.uploader': SharedUploader;
      'shared.user-field': SharedUserField;
      'theme.ui': ThemeUi;
    }
  }
}

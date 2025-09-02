import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Paul Taylor Photography',

  projectId: 'hqy2e0hu',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Categories management
            S.listItem()
              .title('Categories')
              .child(S.documentTypeList('category').title('All Categories')),

            S.divider(),

            // Photos by category (dynamically generated)
            S.listItem()
              .title('Photos by Category')
              .child(
                S.list()
                  .title('Categories')
                  .items([
                    S.listItem()
                      .title('All Photos')
                      .child(S.documentTypeList('photo').title('All Photos')),
                    S.divider(),
                    // This will show categories dynamically
                    ...S.documentTypeListItems().filter(
                      (listItem) => listItem.getId() === 'category',
                    ),
                  ]),
              ),

            S.divider(),

            // All other document types
            ...S.documentTypeListItems().filter((listItem) => {
              const id = listItem.getId()
              return id !== undefined && !['photo', 'category'].includes(id)
            }),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})

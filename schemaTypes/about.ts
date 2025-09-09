import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'content',
      title: 'About Text',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Tell your story',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      description: 'Photo of yourself',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'imageAlt',
      title: 'Image Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyLogos',
      title: 'Company Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'companyName',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'companyName',
              media: 'logo',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(30),
    }),
  ],
  preview: {
    select: {
      title: 'content',
      media: 'image',
    },
    prepare(selection) {
      const {media} = selection
      return {
        title: 'About Page',
        media: media,
      }
    },
  },
})

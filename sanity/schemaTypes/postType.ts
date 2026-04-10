import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { MetaDescriptionInput } from "../components/MetaDescriptionInput";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "author",
      type: "reference",
      to: { type: "author" },
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternative text",
        }),
      ],
    }),
    defineField({
      name: "categories",
      title: "Category",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: { type: "category" } })],
      description:
        "Primary classification for this post (e.g., Web Development, Marketing)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        "Additional labels for fine-grained categorization (e.g., React, Next.js, Frontend)",
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "string",
      description:
        "SEO description shown in Google search results. Aim for 120–160 characters (155 is ideal). Descriptions over 170 chars will be cut off.",
      components: {
        input: MetaDescriptionInput,
      },
      validation: (Rule) =>
        Rule.max(170).warning(
          "This description is over 170 characters and will very likely be truncated by Google.",
        ),
    }),
    defineField({
      name: "body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});

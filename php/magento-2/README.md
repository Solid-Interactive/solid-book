# Magento 2

tags: magento, e-commerce

## Nomenclature

* Action File: A Controller by another name
* [Area](https://devdocs.magento.com/guides/v2.3/architecture/archi_perspectives/components/modules/mod_and_areas.html): A logical component made of multiple modules. Each area can process url requests differently.
* [Block](https://devdocs.magento.com/guides/v2.3/mtf/mtf_entities/mtf_block.html): A PHP class which links layouts and templates
* Controller: A file that responds to a route
* [Layout](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/layouts/layout-overview.html): the way items are arranged on a page. This is defined in an XML file
* [Module](https://devdocs.magento.com/guides/v2.3/architecture/archi_perspectives/components/modules/mod_intro.html): A logical group. Each module has a defined directory structure with a set of expected files. 
* [Page Builder](https://devdocs.magento.com/page-builder/docs/index.html): Magento 2 extension that allows you to create pages without coding. Page Builders comes with Magento 2.
* Route: a url made of three parts: `frontName-controllerName-actionName`
* [Template](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/templates/template-overview.html): Code (PHTML - which is PHP) that adds the features and contents you see
* [Theme](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-overview.html): The way to customize the look and feel of a an application area (e.g. the storefront or the admin)

## CLI

Magento 2 has a great [cli](https://devdocs.magento.com/guides/v2.3/config-guide/cli/config-cli-subcommands.html). [Here](https://www.emiprotechnologies.com/technical_notes/magento-technical-notes-60/post/magento-2-useful-commands-list-391) is a summary of useful commands.

## Routes

The frontend and admin area each have a merged routes.xml file.

The merged file is created from each modules routes file (`etc/<area>/routes.xml`)

## Templates

To understand which templates are used on a page, enable template hints and clear the cache:

```bash
# cd to project root first
bin/magento dev:template-hints:enable
bin/magento cache:clean
```

## Themes

[Change a theme](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-apply.html) for a domain in `CONTENT > Design > Configuration`, then clear the cache: `bin/magento cache:clean`.

## Helpful References

* [Creating a theme](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-create.html)
* [Dev Docs](https://devdocs.magento.com/#/individual-contributors)
* [Magento Glossar](https://glossary.magento.com/)
* [Theme Structure](https://devdocs.magento.com/guides/v2.3/frontend-dev-guide/themes/theme-structure.html)
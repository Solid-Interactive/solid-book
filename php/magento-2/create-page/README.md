# Create a page in Magento 2

tags: e-commerce, magento, pages

This describes how to [create a new page](https://devdocs.magento.com/videos/fundamentals/create-a-new-page/) in Magento.

The description below is for the `HelloPage` page in the `Learning` Area. 

To create a new page, you need a controller that responds to a route.

A route has three parts: `frontName-controllerName-actionName`

The steps to do this are:

1. Create a new module
2. Create a `routes.xml` file
3. Add a controller

## Routes.xml

Since we're in the frontend, we create a frontend routes.xml file: `app/code/Learning/HelloPage/etc/frontend/routes.xml`

## Creating a new module


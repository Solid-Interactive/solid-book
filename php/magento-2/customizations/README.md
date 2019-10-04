# Customizations in Magento

tags: magento, overrides, plugins, observers

## Overriding blocks

Looks in the `view/frontend/layout/default.xml` of the module you want to override. Create a `layout/default.xml` in yours and use `referenceBlock` to override just the needed bits.

For example for a custom logo.

The block is found in:  `/vendor/magento/module-theme/view/frontend/layout/default.xml`, so we create: `/app/design/frontend/Solid/LoveAndPromise/Magento_Theme/layout/default.xml`

The contents are something like:

```xml
<?xml version="1.0"?>
<page xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:View/Layout/etc/page_configuration.xsd">
    <body>
        <referenceBlock name="logo">
            <arguments>
                <argument name="logo_file" xsi:type="string">images/my_logo.svg</argument>
                <argument name="logo_alt" xsi:type="string">My Logo</argument>
                <argument name="logo_img_width" xsi:type="number">109</argument>
                <argument name="logo_img_height" xsi:type="number">85</argument>
            </arguments>
        </referenceBlock>
    </body>
</page>
```

## Overriding Classes

You can override an entire class by setting a preference in di.xml:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:ObjectManager/etc/config.xsd">
    <preference for="MageWorkshop\DetailedReview\Block\Review\Product\View\Rating\ReviewRating" type="Solid\DetailedReviewRatingCustomization\Block\Review\Product\View\Rating\ReviewRating" />
</config>
```

You can now create a class the extends the original class.

## Overriding / Modifying Class Methods

You can use [Interceptors (Plugins)](https://devdocs.magento.com/guides/v2.3/extension-dev-guide/plugins.html) to run stuff before / after / or instead of methods.

## Events and Observers

You can send [events and setup observers](https://devdocs.magento.com/guides/v2.3/extension-dev-guide/events-and-observers.html) for them.

There are 3 places you can put an `events.xml` file to setup an Observer. For front end events use `etc/frontend/events.xml` inside your module.

In `events.xml` declare the event you want to obeserve and its observer:

```xml
<?xml version="1.0"?>
<config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Event/etc/events.xsd">
    <event name="page_block_html_topmenu_gethtml_after">
        <observer name="solid_menu_observer" instance="Solid\Menu\Observer\Topmenu" />
    </event>
</config>
```

The observer is a class that implements the `ObserverInterface`. You create an `execute` methods that takes the `$observer` as an argument. You can dependencies in the constructor if needed.

In my opinion, the trickiest part of observers is knowing what methods to call on them.
For example here is how you get and set the data for the example above:

```php
<?php
namespace Solid\Menu\Observer;
use Magento\Framework\Event\Observer as EventObserver;
use Magento\Framework\Event\ObserverInterface;
class Topmenu implements ObserverInterface
{
    public function execute(EventObserver $observer)
    {
        $transport = $observer->getData('transportObject');
        $html = $transport->getHtml();
        $html .= '<h3>This is customized!</h3>';
        $transport->setHtml($html);
    }
}
```

The way to know that the data to get is `transportObject` and the the getter/setter is Html is to look at where the event is fired:

```php
<?php
// From vendor/magento/module-theme/Block/Html/Topmenu.php
$transportObject = new \Magento\Framework\DataObject(['html' => $html]);
$this->_eventManager->dispatch(
    'page_block_html_topmenu_gethtml_after',
    ['menu' => $this->getMenu(), 'transportObject' => $transportObject]
);
```

## Custom blocks
* If you need to add some functionality to a template, add a custom block to handle the functionality because then you will have access to the dependency injection system provided by magento 2.
* Add the block php file to `app/code/{vendor}/{module}/Block`. The class name should match the file name, and should be namespaced under `{vendor}\{module}\Block`. You can place the block class in a deeper folder, just be sure to update the namespace to match the folders.
* Extend the class from `Magento\Framework\View\Element\Template`.
* Reference the block class from the layout xml, e.g. `<block class="{vendor}\{module}\Block\CustomBlock" ... />`.
* Add dependencies as parameters to the block class constructor. Magento will automatically inject the dependencies when the block is instantiated.
* Access the block in the template as the variable `$block`.

## Customize strings
* To customize strings from magento core, add `"{source}", "{new}"` as a new line to `app/design/frontend/{vendor}/{theme}/i18n/en_US.csv`.

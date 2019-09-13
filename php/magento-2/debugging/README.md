# Debugging Magento 2

tags: magento, debugging

## Bucket doesn't exist error.

This is due to categories not being selected as "anchor" categories.

The fix can be done manually by going to [each category in the admin](https://meetanshi.com/blog/set-anchor-to-yes-in-all-categories-in-magento-2/), opening the accordion and selecting the checkbox... or in the DB:

```mysql
SELECT attribute_id FROM eav_attribute where attribute_code = 'is_anchor';

# 120 was the attribute id from the above
UPDATE catalog_category_entity_int set value = 1 where attribute_id = 120;
```

to see the updates from the DB you have to reindex:

```bash
bin/magento indexer:reindex
```


# Elasticsearch

tags: tag1, tag2, tag3

## Binding to localhost

```
# /etc/elasticsearch/elasticsearch.yml
network.bind_host: 127.0.0.1
network.publish_host: 127.0.0.1
network.host: 127.0.0.1
```

Make sure you add a cluster name to stop other ES instances on the network from joining the cluster automatically

```
cluster.name: project_production
node.name: project_node_1
network.host: 1.2.3.4
``` 

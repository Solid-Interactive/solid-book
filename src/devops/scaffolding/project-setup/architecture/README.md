# Application Architecture

tags: devops, scaffolding, project-setup, directories

## Directory structure

The directory structure of an application has a surprisingly large effect on the
maintainability and debugability of a project. Being able to quickly find the
file you're looking for when onboarding to a new project increase efficiency.

For large JavaScript projects, there are two main ways to organize your files. One
is to separate files by functionality, and the other is two group functional units.

For example if you are making a Backbone app with models, views, and templates:

### Functional group organization

```
model
  calendar
  breadCrumb
  footer
view
  calendar
  breadCrumb
  footer
template
  calendar
  breadCrumb
  footer
```

### Pod organization

```
calendar
  model
  view
  template
breadCrumb
  model
  view
  template
footer
  model
  view
  template
```



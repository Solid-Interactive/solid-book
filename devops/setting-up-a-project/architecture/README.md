# Application Architecture

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

We have tried both of these methods, and in general it appears to be easier to
find files in a pod organization. This is especially true when the project starts
getting bigger, and there are 30+ views. Additionally a pod architecture makes it
very fast to copy paste a pod and with a few minor changes get a working view.

If you find yourself setting up many projects with almost identical inital directory
structures, it is a good idea to setup some sort of project scaffolding builder.

Grunt-init is a good tool for this.

---
inject: true
to: .storybook/main.js
skip_if: components/<%= name %>
prepend: true
---
import '../components/<%= name %>/<%= name %>.story'
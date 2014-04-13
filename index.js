var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates');


Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .destination('./build')
    .build()

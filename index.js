var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');


Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());


Metalsmith(__dirname)
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(templates('handlebars'))
    .destination('./build')
    .build()

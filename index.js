var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    Handlebars = require('handlebars'),
    fs         = require('fs');


Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());


Metalsmith(__dirname)
    .use(markdown())
    .use(templates('handlebars'))
    .destination('./build')
    .build()

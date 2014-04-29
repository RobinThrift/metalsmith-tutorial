var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    coffee      = require('metalsmith-coffee'),
    sass        = require('metalsmith-sass'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');


Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.hbt').toString());
Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.hbt').toString());

var findTemplate = function(config) {
    var pattern = new RegExp(config.pattern);

    return function(files, metalsmith, done) {
        for (var file in files) {
            if (pattern.test(file)) {
                var _f = files[file];
                if (!_f.template) {
                    _f.template = config.templateName;
                }
            }
        }
        done();
    };
};

Metalsmith(__dirname)
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        posts: {
            pattern: 'content/posts/*.md',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(findTemplate({
        pattern: 'posts',
        templateName: 'post.hbt'
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collection/:title'
    }))
    .use(templates('handlebars'))
    .use(sass({
        outputStyle: 'compressed'
    }))
    .use(coffee())
    .destination('./build')
    .build(function(err, files) {
        if (err) { throw err; }
    });

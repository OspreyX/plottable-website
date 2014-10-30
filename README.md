Plottable Landing Page
======================

This site uses Grunt to run concat/minify/imagemin and Compass/SASS. Pages are compiled using Jekyll, using Github-Pages gem.


Installation
------------

Install [Bundler](http://bundler.io):

    [sudo] gem install bundler

Install Gems:

    bundle install

Install [Node.JS/npm](http://nodejs.org):

    Follow instructions online...

Install [Grunt CLI](http://gruntjs.com/getting-started)

    npm install -g grunt-cli

Install npm dependencies:

    npm install

Run default Grunt task:

    grunt


Running
-------

To run Jekyll and Grunt watch, all you need to run is the following:

    foreman start


_We now use Foreman to run both of these tasks with one simple command_

To start building pages using Jekyll and compiling assets with Grunt, run these two commands:

To run Jekyll:

    bundle exec jekyll serve --watch

To run Grunt then watch:

    grunt && grunt watch


Frameworks
----------

Modernizr and Compass are available. Bootstrap 3.1.1 is included as source sass (not using `bootstrap-sass` since I couldn't figure out how to manage to include javascript files using `grunt-contrib-compass`)


Grunt (build tool)
------------------

## Image Assets

Grunt will automatically compile (optimize/strip metadata) image files inside `/images` and put them into `_sites/build/`. So, in order to reference images you will need to prepend `/build` to the URL. For example if you have an image `/images/global/foobar.png` you would reference:

    <img src="/build/images/global/foobar.png">

_This is a good candidate to create a custom Liquid Filter._

## JavaScript / SASS

The default Grunt task will compile and minify specific JavaScript/SASS files. You'll need to look at the `Gruntfile` to see the specifics. In order to include a new JS file, you'll need to add that file in `Gruntfile`. For the most part, you'll want to include your JS file to concatenate with `/build/js/application.js` however, you'll see that Modernizr and Respond.js are compiled separately. This is because Modernizr need to be included in `<head>` while Respond.js is included only for IE < 9. If for some reason you need to be specific about how to include your JS, you'll want to specify that in the `Gruntfile`.


Docs
----

[TypeDoc](http://typedoc.io) is used to generate docs. You can generate docs for a given version of Plottable by running:

    ./generate-docs.sh 'v0.34.0'

Additional documentation written in Markdown can be included for each model page. For example, to add additional documentation to Plottable module, do the following:

1. Create the documentation in markdown and save it to: `_includes/readme/plottable.md`
2. In `_config.yml` add the `readmes` hash if it doesn't exist, and add the following key:value `Plottable: readme/plottable.md`

Once you run the bash script, you should see the new content in the Plottable page. The basic idea is, create the documentation and save it somewhere in `_includes`. The `_includes/readme` directory is there just for convention. As long as you point the appropriate model:path_to.md in `_config.yml` it will be properly included.

If you want to know what the model name for a particular page is, just go to the page and do a view source. You'll see the model name as a comment near the top. Right now the model names don't exist in their namespace, so there could be collision. If this is a problem, we should fix it in the near future.


Notes
-----

Don't touch anything in `/build`. All assets will automatically be generated there. If you edit any files in that directory, the next time the source is modified, a new generated file will destroy any changes you made.

The recommended workflow is to have two terminal windows open, one running jekyll watch and the other running grunt watch. Actually, there should be one rake task that should launch all necessary tasks.

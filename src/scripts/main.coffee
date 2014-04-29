
class App 
    constructor: (@name) ->
        console.log "#{name} was initialized"

    doStuff: ->
        console.log "Te Most Useful Method Ever!"




a = new App 'Hello World App'

a.doStuff()
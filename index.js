(function () {
    var LTIProm = function (func) {
        if(window.Promise) {
            return new Promise(func);
        }
        var thens = [];
        var catches = [];
        var thened = false;
        var caught = false;
        var thend = null;
        var catchd = null;
        /* promise pony fill */
        var prom = {
            then: function (call) {
                if(thened) {
                    call(thend)
                } else {
                    thens.push(call)
                }
                return prom;
            },
            catch: function (call) {
                if(caught) {
                    call(catchd)
                } else {
                    thens.push(call)
                }
                return prom;
            }
        };
        func(
            function (result) {
                if(thened || caught) { return }
                thend = result;
                thened = true;
                thens.forEach(THEN => {
                    THEN (result)
                });
            },
            function (error) {
                if(thened || caught) { return }
                catchd = error;
                caught = true;
                catches.forEach(CATCH => {
                    CATCH (error)
                });
            },
        );
        return prom;
    }
})();
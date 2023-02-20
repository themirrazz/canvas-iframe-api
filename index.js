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
    };
    var __uuid_random_hex = function () {
        return ['A','B','C','D','E','F','0','1','2','3','4','5','6','7','8','9'][Math.floor(Math.random()*16)];
    };
    var __uuid_random_uid = function () {
        return (
            __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + "-"
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + "-"
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + "-"
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + "-"
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
            + __uuid_random_hex()
        );
    }
    var __lti_send_callback = function (data, callback) {
        var __uuid = __uuid_random_uid();
        var __cbf = function (event) {
            if(event.message_id && event.message_id == event.data.message_id) {
                callback(event.data);
                try {
                    window.removeEventListener('message',__cbf)
                } catch (error) {
                    return null;
                }
            }
        }
        if(data.message_id && window.addEventListener) {
            window.addEventListener('message',data.message_id)
        }
        parent.postMessage(data,'*');
    };
})();
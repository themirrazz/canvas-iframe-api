(function () {
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
                try {
                    callback(event.data);
                } catch (error) {
                    return null;
                }
                window.removeEventListener('message',__cbf);
            }
        }
        if(data.message_id && window.addEventListener) {
            window.addEventListener('message',data.message_id)
        }
        parent.postMessage(data,'*');
    };
    var __lti_send_async = function (data) {
        return new Promise((resolve, reject) => {
            if(data.message_id) {
                __lti_send_callback(data);
                return resolve();
            }
            var __res_timed_out = false;
            setTimeout(function () {
                __res_timed_out = true;
                reject(new TypeError('response from Canvas LTI timed out'));
            },10000);
            __lti_send_callback(data,dat => {
                if(!__res_timed_out) {
                    resolve(dat);
                }
            });
        });
    };
    window.CanvasLTI = {
        ShowAlert: ({ title, type, body }) => {
            if(!type) { type='success'; }
            if(type != 'success' && type != 'error' && type != 'warning') {
                throw new TypeError("the 'type' paramater must be one of 'success', 'warning', or 'error'");
            }
            if(!title) {
                throw new TypeError("the 'title' parameter is required");
            }
            if(!body) {
                throw new TypeError("the 'body' parameter is required");
            }
            return __lti_send_async({
                subject: 'lti.showAlert',
                type: type||'success',
                body,
                title
            });
        }
    }
})();
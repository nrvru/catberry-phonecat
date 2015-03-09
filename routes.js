'use strict';

// This file contains definitions of rules how location URLs are translated
// to parameters for stores in Catberry application.
//
// Format:
// /some/:parameter[store1,store2,store3]
//
// More details here:
// https://github.com/catberry/catberry/blob/master/docs/index.md#routing

module.exports = [
	'/:mainPath[CurrentPage]',
    '/phones/:phoneId[CurrentPage,PhoneDetail]'
    //{
    //    expression: /^\/phones\/.+\.(?!(json)$)([^.]+$)/,
    //    map: function(urlPath){
    //        var matches = urlPath.match(/^\/phones\/(.+)\.(?!(json)$)([^.]+$)/i);
    //        console.log(matches);
    //        return {
    //            PhoneDetail: {
    //                phoneId: matches[1]
    //            }
    //        }
    //    }
    //}
];

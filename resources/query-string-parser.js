/*
   Query string decoder object obtained from:
     <http://unixpapa.com/js/querystring.html>

   I, Sophie Hamilton, claim no copyright over it. It is reproduced here with
   the permission of the creator:

   'As with all the code on these "Javascript Madness" pages, you may use this
    freely in any way without worrying about my copyright at all, and, as
    usual, it is offered without warrantee.' [sic]

   2023-05-22: I have modified the initialisation to use a more strict method
               of checking if a value was passed in; this allows for correctly
               creating a QueryString object based on a link's search component
               without having to test that the search component exists first.

               I also learned today that the original author of the decoder, Jan
               Wolter, died in 2015 from complications of influenza
               (https://unixpapa.com/).

               Rest in peace, Jan.
*/

// Query String Parser
//
//    qs= new QueryString()
//    qs= new QueryString(string)
//
//        Create a query string object based on the given query string. If
//        no string is given, we use the one from the current page by default.
//
//    qs.value(key)
//
//        Return a value for the named key.  If the key was not defined,
//        it will return undefined. If the key was multiply defined it will
//        return the last value set. If it was defined without a value, it
//        will return an empty string.
//
//   qs.values(key)
//
//        Return an array of values for the named key. If the key was not
//        defined, an empty array will be returned. If the key was multiply
//        defined, the values will be given in the order they appeared on
//        in the query string.
//
//   qs.keys()
//
//        Return an array of unique keys in the query string.  The order will
//        not necessarily be the same as in the original query, and repeated
//        keys will only be listed once.
//
//    QueryString.decode(string)
//
//        This static method is an error tolerant version of the builtin
//        function decodeURIComponent(), modified to also change pluses into
//        spaces, so that it is suitable for query string decoding. You
//        shouldn't usually need to call this yourself as the value(),
//        values(), and keys() methods already decode everything they return.
//
// Note: W3C recommends that ; be accepted as an alternative to & for
// separating query string fields. To support that, simply insert a semicolon
// immediately after each ampersand in the regular expression in the first
// function below.

function QueryString(qs)
{
    this.dict= {};

    // If no query string  was passed in use the one from the current page
    if (typeof qs === "undefined") qs= location.search;

    // Delete leading question mark, if there is one
    if (qs.charAt(0) == '?') qs= qs.substring(1);

    // Parse it
    var re= /([^=&]+)(=([^&]*))?/g;
    while (match= re.exec(qs))
    {
        var key= decodeURIComponent(match[1].replace(/\+/g,' '));
        var value= match[3] ? QueryString.decode(match[3]) : '';
        if (this.dict[key])
            this.dict[key].push(value);
        else
            this.dict[key]= [value];
    }
}

QueryString.decode= function(s)
{
    s= s.replace(/\+/g,' ');
    s= s.replace(/%([EF][0-9A-F])%([89AB][0-9A-F])%([89AB][0-9A-F])/gi,
        function(code,hex1,hex2,hex3)
        {
            var n1= parseInt(hex1,16)-0xE0;
            var n2= parseInt(hex2,16)-0x80;
            if (n1 == 0 && n2 < 32) return code;
            var n3= parseInt(hex3,16)-0x80;
            var n= (n1<<12) + (n2<<6) + n3;
            if (n > 0xFFFF) return code;
            return String.fromCharCode(n);
        });
    s= s.replace(/%([CD][0-9A-F])%([89AB][0-9A-F])/gi,
        function(code,hex1,hex2)
        {
            var n1= parseInt(hex1,16)-0xC0;
            if (n1 < 2) return code;
            var n2= parseInt(hex2,16)-0x80;
            return String.fromCharCode((n1<<6)+n2);
        });
    s= s.replace(/%([0-7][0-9A-F])/gi,
        function(code,hex)
        {
            return String.fromCharCode(parseInt(hex,16));
        });
    return s;
};

QueryString.prototype.value= function (key)
{
    var a= this.dict[key];
    return a ? a[a.length-1] : undefined;
};

QueryString.prototype.values= function (key)
{
    var a= this.dict[key];
    return a ? a : [];
};

QueryString.prototype.keys= function ()
{
    var a= [];
    for (var key in this.dict)
        a.push(key);
    return a;
};

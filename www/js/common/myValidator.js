
var myValidator = {
    replaceAll:function(OldString,FindString,ReplaceString) {
        var SearchIndex = 0;
        var NewString = "";
        while (OldString.indexOf(FindString,SearchIndex) != -1) {
            NewString += OldString.substring(SearchIndex,OldString.indexOf(FindString,SearchIndex));
            NewString += ReplaceString;
            SearchIndex = (OldString.indexOf(FindString,SearchIndex) + FindString.length);
        }
        NewString += OldString.substring(SearchIndex,OldString.length);
        return NewString;
    },
    emailCheck:function(emailStr) {
        /* The following pattern is used to check if the entered e-mail address
	   fits the user@domain format.  It also is used to separate the username
	   from the domain. */
        var emailPat=/^(.+)@(.+)$/
        /* The following string represents the pattern for matching all special
	   characters.  We don't want to allow special characters in the address.
	   These characters include ( ) < > @ , ; : \ " . [ ]    */
        var specialChars="\\(\\)<>@,;:\\\\\\\"\\.\\[\\]"
        /* The following string represents the range of characters allowed in a
	   username or domainname.  It really states which chars aren't allowed. */
        var validChars="\[^\\s" + specialChars + "\]"
        /* The following pattern applies if the "user" is a quoted string (in
	   which case, there are no rules about which characters are allowed
	   and which aren't; anything goes).  E.g. "jiminy cricket"@disney.com
	   is a legal e-mail address. */
        var quotedUser="(\"[^\"]*\")"
        /* The following pattern applies for domains that are IP addresses,
	   rather than symbolic names.  E.g. joe@[123.124.233.4] is a legal
	   e-mail address. NOTE: The square brackets are required. */
        var ipDomainPat=/^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/
        /* The following string represents an atom (basically a series of
	   non-special characters.) */
        var atom=validChars + '+'
        /* The following string represents one word in the typical username.
	   For example, in john.doe@somewhere.com, john and doe are words.
	   Basically, a word is either an atom or quoted string. */
        var word="(" + atom + "|" + quotedUser + ")"
        // The following pattern describes the structure of the user
        var userPat=new RegExp("^" + word + "(\\." + word + ")*$")
        /* The following pattern describes the structure of a normal symbolic
	   domain, as opposed to ipDomainPat, shown above. */
        var domainPat=new RegExp("^" + atom + "(\\." + atom +")*$")
	
	
        /* Finally, let's start trying to figure out if the supplied address is
	   valid. */
	
        /* Begin with the coarse pattern to simply break up user@domain into
	   different pieces that are easy to analyze. */
        var matchArray=emailStr.match(emailPat)
        if (matchArray==null) {
            /* Too many/few @'s or something; basically, this address doesn't
		 even fit the general mould of a valid e-mail address. */
            alert("Email error. Repeat !")
            return false
        }
        var user=matchArray[1]
        var domain=matchArray[2]
	
        // See if "user" is valid
        if (!noSpecialCharacter( user)) {
            alert("Email error. Repeat !");
            return false;
        }
        if (user.match(userPat)==null) {
            // user is not valid
            alert("Email error. Repeat !");
            return false;
        }
        return true;
    }
}
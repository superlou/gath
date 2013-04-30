define("ace/mode/javascript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/javascript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/worker/worker_client","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"],function(e,t){var n=e("../lib/oop"),i=e("./text").Mode,o=e("../tokenizer").Tokenizer,r=e("./javascript_highlight_rules").JavaScriptHighlightRules,s=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("../range").Range,l=e("../worker/worker_client").WorkerClient,c=e("./behaviour/cstyle").CstyleBehaviour,h=e("./folding/cstyle").FoldMode,u=function(){this.$tokenizer=new o((new r).getRules()),this.$outdent=new s,this.$behaviour=new c,this.foldingRules=new h};n.inherits(u,i),function(){this.toggleCommentLines=function(e,t,n,i){for(var o=!0,r=/^(\s*)\/\//,s=n;i>=s;s++)if(!r.test(t.getLine(s))){o=!1;break}if(o)for(var l=new a(0,0,0,0),s=n;i>=s;s++){var c=t.getLine(s),h=c.match(r);l.start.row=s,l.end.row=s,l.end.column=h[0].length,t.replace(l,h[1])}else t.indentRows(n,i,"//")},this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e),r=o.tokens,s=o.state;if(r.length&&"comment"==r[r.length-1].type)return i;if("start"==e||"regex_allowed"==e){var a=t.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);a&&(i+=n)}else if("doc-start"==e){if("start"==s||"regex_allowed"==e)return"";var a=t.match(/^\s*(\/?)\*/);a&&(a[1]&&(i+=" "),i+="* ")}return i},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new l(["ace"],"ace/mode/javascript_worker","JavaScriptWorker");return t.attachToDocument(e.getDocument()),t.on("jslint",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t}}.call(u.prototype),t.Mode=u}),define("ace/mode/javascript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/doc_comment_highlight_rules","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),i=e("./doc_comment_highlight_rules").DocCommentHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,r=function(){var e=this.createKeywordMapper({"variable.language":"Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Namespace|QName|XML|XMLList|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|isNaN|parseFloat|parseInt|JSON|Math|this|arguments|prototype|window|document",keyword:"const|yield|import|get|set|break|case|catch|continue|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|__parent__|__count__|escape|unescape|with|__proto__|class|enum|extends|super|export|implements|private|public|interface|package|protected|static","storage.type":"const|let|var|function","constant.language":"null|Infinity|NaN|undefined","support.function":"alert","constant.language.boolean":"true|false"},"identifier"),t="case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void",n="[a-zA-Z\\$_¡-￿][a-zA-Z\\d\\$_¡-￿]*\\b",o="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={start:[{token:"comment",regex:/\/\/.*$/},i.getStartRule("doc-start"),{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:["storage.type","punctuation.operator","support.function","punctuation.operator","entity.name.function","text","keyword.operator"],regex:"("+n+")(\\.)(prototype)(\\.)("+n+")(\\s*)(=)",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+n+")(\\.)("+n+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","keyword.operator","text","storage.type","text","paren.lparen"],regex:"("+n+")(\\s*)(=)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","punctuation.operator","entity.name.function","text","keyword.operator","text","storage.type","text","entity.name.function","text","paren.lparen"],regex:"("+n+")(\\.)("+n+")(\\s*)(=)(\\s*)(function)(\\s+)(\\w+)(\\s*)(\\()",next:"function_arguments"},{token:["storage.type","text","entity.name.function","text","paren.lparen"],regex:"(function)(\\s+)("+n+")(\\s*)(\\()",next:"function_arguments"},{token:["entity.name.function","text","punctuation.operator","text","storage.type","text","paren.lparen"],regex:"("+n+")(\\s*)(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:["text","text","storage.type","text","paren.lparen"],regex:"(:)(\\s*)(function)(\\s*)(\\()",next:"function_arguments"},{token:"keyword",regex:"(?:"+t+")\\b",next:"regex_allowed"},{token:["punctuation.operator","support.function"],regex:/(\.)(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:opzzzz|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/},{token:["punctuation.operator","support.function.dom"],regex:/(\.)(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/},{token:["punctuation.operator","support.constant"],regex:/(\.)(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/},{token:["storage.type","punctuation.operator","support.function.firebug"],regex:/(console)(\.)(warn|info|log|error|time|timeEnd|assert)\b/},{token:e,regex:n},{token:"keyword.operator",regex:/--|\+\+|[!$%&*+\-~]|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\|\||\?\:|\*=|%=|\+=|\-=|&=|\^=/,next:"regex_allowed"},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./,next:"regex_allowed"},{token:"paren.lparen",regex:/[\[({]/,next:"regex_allowed"},{token:"paren.rparen",regex:/[\])}]/},{token:"keyword.operator",regex:/\/=?/,next:"regex_allowed"},{token:"comment",regex:/^#!.*$/}],regex_allowed:[i.getStartRule("doc-start"),{token:"comment",regex:"\\/\\*",next:"comment_regex_allowed"},{token:"comment",regex:"\\/\\/.*$"},{token:"string.regexp",regex:"\\/",next:"regex"},{token:"text",regex:"\\s+"},{token:"empty",regex:"",next:"start"}],regex:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"string.regexp",regex:"/\\w*",next:"start"},{token:"invalid",regex:/\{\d+,?(?:\d+)?}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/},{token:"constant.language.escape",regex:/\(\?[:=!]|\)|{\d+,?(?:\d+)?}|{,\d+}|[+*]\?|[()$^+*?]/},{token:"constant.language.delimiter",regex:/\|/},{token:"constant.language.escape",regex:/\[\^?/,next:"regex_character_class"},{token:"empty",regex:"$",next:"start"},{defaultToken:"string.regexp"}],regex_character_class:[{token:"regexp.keyword.operator",regex:"\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"},{token:"constant.language.escape",regex:"]",next:"regex"},{token:"constant.language.escape",regex:"-"},{token:"empty",regex:"$",next:"start"},{defaultToken:"string.regexp.charachterclass"}],function_arguments:[{token:"variable.parameter",regex:n},{token:"punctuation.operator",regex:"[, ]+"},{token:"punctuation.operator",regex:"$"},{token:"empty",regex:"",next:"start"}],comment_regex_allowed:[{token:"comment",regex:"\\*\\/",next:"regex_allowed"},{defaultToken:"comment"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}],qqstring:[{token:"constant.language.escape",regex:o},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],qstring:[{token:"constant.language.escape",regex:o},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}]},this.embedRules(i,"doc-",[i.getEndRule("start")])};n.inherits(r,o),t.JavaScriptHighlightRules=r}),define("ace/mode/doc_comment_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){this.$rules={start:[{token:"comment.doc.tag",regex:"@[\\w\\d_]+"},{token:"comment.doc.tag",regex:"\\bTODO\\b"},{defaultToken:"comment.doc"}]}};n.inherits(o,i),o.getStartRule=function(e){return{token:"comment.doc",regex:"\\/\\*(?=\\*)",next:e}},o.getEndRule=function(e){return{token:"comment.doc",regex:"\\*\\/",next:e}},t.DocCommentHighlightRules=o}),define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],function(e,t){var n=e("../range").Range,i=function(){};(function(){this.checkOutdent=function(e,t){return/^\s+$/.test(e)?/^\s*\}/.test(t):!1},this.autoOutdent=function(e,t){var i=e.getLine(t),o=i.match(/^(\s*\})/);if(!o)return 0;var r=o[1].length,s=e.findMatchingBracket({row:t,column:r});if(!s||s.row==t)return 0;var a=this.$getIndent(e.getLine(s.row));e.replace(new n(t,0,t,r-1),a)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""}}).call(i.prototype),t.MatchingBraceOutdent=i}),define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"],function(e,t){var n=e("../../lib/oop"),i=e("../behaviour").Behaviour,o=e("../../token_iterator").TokenIterator,r=e("../../lib/lang"),s=["text","paren.rparen","punctuation.operator"],a=["text","paren.rparen","punctuation.operator","comment"],l=0,c=-1,h="",u=0,d=-1,f="",g="",p=function(){p.isSaneInsertion=function(e,t){var n=e.getCursorPosition(),i=new o(t,n.row,n.column);if(!this.$matchTokenType(i.getCurrentToken()||"text",s)){var r=new o(t,n.row,n.column+1);if(!this.$matchTokenType(r.getCurrentToken()||"text",s))return!1}return i.stepForward(),i.getCurrentTokenRow()!==n.row||this.$matchTokenType(i.getCurrentToken()||"text",a)},p.$matchTokenType=function(e,t){return t.indexOf(e.type||e)>-1},p.recordAutoInsert=function(e,t,n){var i=e.getCursorPosition(),o=t.doc.getLine(i.row);this.isAutoInsertedClosing(i,o,h[0])||(l=0),c=i.row,h=n+o.substr(i.column),l++},p.recordMaybeInsert=function(e,t,n){var i=e.getCursorPosition(),o=t.doc.getLine(i.row);this.isMaybeInsertedClosing(i,o)||(u=0),d=i.row,f=o.substr(0,i.column)+n,g=o.substr(i.column),u++},p.isAutoInsertedClosing=function(e,t,n){return l>0&&e.row===c&&n===h[0]&&t.substr(e.column)===h},p.isMaybeInsertedClosing=function(e,t){return u>0&&e.row===d&&t.substr(e.column)===g&&t.substr(0,e.column)==f},p.popAutoInsertedClosing=function(){h=h.substr(1),l--},p.clearMaybeInsertedClosing=function(){u=0,d=-1},this.add("braces","insertion",function(e,t,n,i,o){var s=n.getCursorPosition(),a=i.doc.getLine(s.row);if("{"==o){var l=n.getSelectionRange(),c=i.doc.getTextRange(l);if(""!==c&&"{"!==c&&n.getWrapBehavioursEnabled())return{text:"{"+c+"}",selection:!1};if(p.isSaneInsertion(n,i))return/[\]\}\)]/.test(a[s.column])?(p.recordAutoInsert(n,i,"}"),{text:"{}",selection:[1,1]}):(p.recordMaybeInsert(n,i,"{"),{text:"{",selection:[1,1]})}else if("}"==o){var h=a.substring(s.column,s.column+1);if("}"==h){var d=i.$findOpeningBracket("}",{column:s.column+1,row:s.row});if(null!==d&&p.isAutoInsertedClosing(s,a,o))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}else if("\n"==o||"\r\n"==o){var f="";p.isMaybeInsertedClosing(s,a)&&(f=r.stringRepeat("}",u),p.clearMaybeInsertedClosing());var h=a.substring(s.column,s.column+1);if("}"==h||""!==f){var g=i.findMatchingBracket({row:s.row,column:s.column},"}");if(!g)return null;var m=this.getNextLineIndent(e,a.substring(0,s.column),i.getTabString()),v=this.$getIndent(a);return{text:"\n"+m+"\n"+v+f,selection:[1,m.length,1,m.length]}}}}),this.add("braces","deletion",function(e,t,n,i,o){var r=i.doc.getTextRange(o);if(!o.isMultiLine()&&"{"==r){var s=i.doc.getLine(o.start.row),a=s.substring(o.end.column,o.end.column+1);if("}"==a)return o.end.column++,o;u--}}),this.add("parens","insertion",function(e,t,n,i,o){if("("==o){var r=n.getSelectionRange(),s=i.doc.getTextRange(r);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"("+s+")",selection:!1};if(p.isSaneInsertion(n,i))return p.recordAutoInsert(n,i,")"),{text:"()",selection:[1,1]}}else if(")"==o){var a=n.getCursorPosition(),l=i.doc.getLine(a.row),c=l.substring(a.column,a.column+1);if(")"==c){var h=i.$findOpeningBracket(")",{column:a.column+1,row:a.row});if(null!==h&&p.isAutoInsertedClosing(a,l,o))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("parens","deletion",function(e,t,n,i,o){var r=i.doc.getTextRange(o);if(!o.isMultiLine()&&"("==r){var s=i.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(")"==a)return o.end.column++,o}}),this.add("brackets","insertion",function(e,t,n,i,o){if("["==o){var r=n.getSelectionRange(),s=i.doc.getTextRange(r);if(""!==s&&n.getWrapBehavioursEnabled())return{text:"["+s+"]",selection:!1};if(p.isSaneInsertion(n,i))return p.recordAutoInsert(n,i,"]"),{text:"[]",selection:[1,1]}}else if("]"==o){var a=n.getCursorPosition(),l=i.doc.getLine(a.row),c=l.substring(a.column,a.column+1);if("]"==c){var h=i.$findOpeningBracket("]",{column:a.column+1,row:a.row});if(null!==h&&p.isAutoInsertedClosing(a,l,o))return p.popAutoInsertedClosing(),{text:"",selection:[1,1]}}}}),this.add("brackets","deletion",function(e,t,n,i,o){var r=i.doc.getTextRange(o);if(!o.isMultiLine()&&"["==r){var s=i.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if("]"==a)return o.end.column++,o}}),this.add("string_dquotes","insertion",function(e,t,n,i,o){if('"'==o||"'"==o){var r=o,s=n.getSelectionRange(),a=i.doc.getTextRange(s);if(""!==a&&"'"!==a&&'"'!=a&&n.getWrapBehavioursEnabled())return{text:r+a+r,selection:!1};var l=n.getCursorPosition(),c=i.doc.getLine(l.row),h=c.substring(l.column-1,l.column);if("\\"==h)return null;for(var u,d=i.getTokens(s.start.row),f=0,g=-1,m=0;d.length>m&&(u=d[m],"string"==u.type?g=-1:0>g&&(g=u.value.indexOf(r)),!(u.value.length+f>s.start.column));m++)f+=d[m].value.length;if(!u||0>g&&"comment"!==u.type&&("string"!==u.type||s.start.column!==u.value.length+f-1&&u.value.lastIndexOf(r)===u.value.length-1)){if(!p.isSaneInsertion(n,i))return;return{text:r+r,selection:[1,1]}}if(u&&"string"===u.type){var v=c.substring(l.column,l.column+1);if(v==r)return{text:"",selection:[1,1]}}}}),this.add("string_dquotes","deletion",function(e,t,n,i,o){var r=i.doc.getTextRange(o);if(!o.isMultiLine()&&('"'==r||"'"==r)){var s=i.doc.getLine(o.start.row),a=s.substring(o.start.column+1,o.start.column+2);if(a==r)return o.end.column++,o}})};n.inherits(p,i),t.CstyleBehaviour=p}),define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),i=(e("../../range").Range,e("./fold_mode").FoldMode),o=t.FoldMode=function(){};n.inherits(o,i),function(){this.foldingStartMarker=/(\{|\[)[^\}\]]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/,this.getFoldWidgetRange=function(e,t,n){var i=e.getLine(n),o=i.match(this.foldingStartMarker);if(o){var r=o.index;return o[1]?this.openingBracketBlock(e,o[1],n,r):e.getCommentFoldRange(n,r+o[0].length,1)}if("markbeginend"===t){var o=i.match(this.foldingStopMarker);if(o){var r=o.index+o[0].length;return o[1]?this.closingBracketBlock(e,o[1],n,r):e.getCommentFoldRange(n,r,-1)}}}}.call(o.prototype)});
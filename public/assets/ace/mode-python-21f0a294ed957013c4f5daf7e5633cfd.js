define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/python_highlight_rules","ace/mode/folding/pythonic","ace/range"],function(e,t){var n=e("../lib/oop"),i=e("./text").Mode,o=e("../tokenizer").Tokenizer,r=e("./python_highlight_rules").PythonHighlightRules,s=e("./folding/pythonic").FoldMode,a=e("../range").Range,l=function(){this.$tokenizer=new o((new r).getRules()),this.foldingRules=new s("\\:")};n.inherits(l,i),function(){this.toggleCommentLines=function(e,t,n,i){for(var o=!0,r=/^(\s*)#/,s=n;i>=s;s++)if(!r.test(t.getLine(s))){o=!1;break}if(o)for(var l=new a(0,0,0,0),s=n;i>=s;s++){var c=t.getLine(s),h=c.match(r);l.start.row=s,l.end.row=s,l.end.column=h[0].length,t.replace(l,h[1])}else t.indentRows(n,i,"#")},this.getNextLineIndent=function(e,t,n){var i=this.$getIndent(t),o=this.$tokenizer.getLineTokens(t,e),r=o.tokens;if(r.length&&"comment"==r[r.length-1].type)return i;if("start"==e){var s=t.match(/^.*[\{\(\[\:]\s*$/);s&&(i+=n)}return i};var e={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(t,n,i){if("\r\n"!==i&&"\r"!==i&&"\n"!==i)return!1;var o=this.$tokenizer.getLineTokens(n.trim(),t).tokens;if(!o)return!1;do var r=o.pop();while(r&&("comment"==r.type||"text"==r.type&&r.value.match(/^\s+$/)));return r?"keyword"==r.type&&e[r.value]:!1},this.autoOutdent=function(e,t,n){n+=1;var i=this.$getIndent(t.getLine(n)),o=t.getTabString();i.slice(-o.length)==o&&t.remove(new a(n,i.length-o.length,n,i.length))}}.call(l.prototype),t.Mode=l}),define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],function(e,t){var n=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,o=function(){var e="and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield",t="True|False|None|NotImplemented|Ellipsis|__debug__",n="abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern",i=this.createKeywordMapper({"invalid.deprecated":"debugger","support.function":n,"constant.language":t,keyword:e},"identifier"),o="(?:r|u|ur|R|U|UR|Ur|uR)?",r="(?:(?:[1-9]\\d*)|(?:0))",s="(?:0[oO]?[0-7]+)",a="(?:0[xX][\\dA-Fa-f]+)",l="(?:0[bB][01]+)",c="(?:"+r+"|"+s+"|"+a+"|"+l+")",h="(?:[eE][+-]?\\d+)",u="(?:\\.\\d+)",d="(?:\\d+)",f="(?:(?:"+d+"?"+u+")|(?:"+d+"\\.))",g="(?:(?:"+f+"|"+d+")"+h+")",p="(?:"+g+"|"+f+")";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:o+'"{3}(?:[^\\\\]|\\\\.)*?"{3}'},{token:"string",regex:o+'"{3}.*$',next:"qqstring"},{token:"string",regex:o+'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:o+"'{3}(?:[^\\\\]|\\\\.)*?'{3}"},{token:"string",regex:o+"'{3}.*$",next:"qstring"},{token:"string",regex:o+"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:"(?:"+p+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:p},{token:"constant.numeric",regex:c+"[lL]\\b"},{token:"constant.numeric",regex:c+"\\b"},{token:i,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:[^\\\\]|\\\\.)*?"{3}',next:"start"},{token:"string",regex:".+"}],qstring:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?'{3}",next:"start"},{token:"string",regex:".+"}]}};n.inherits(o,i),t.PythonHighlightRules=o}),define("ace/mode/folding/pythonic",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(e,t){var n=e("../../lib/oop"),i=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){this.foldingStartMarker=new RegExp("([\\[{])(?:\\s*)$|("+e+")(?:\\s*)(?:#.*)?$")};n.inherits(o,i),function(){this.getFoldWidgetRange=function(e,t,n){var i=e.getLine(n),o=i.match(this.foldingStartMarker);return o?o[1]?this.openingBracketBlock(e,o[1],n,o.index):o[2]?this.indentationBlock(e,n,o.index+o[2].length):this.indentationBlock(e,n):void 0}}.call(o.prototype)});
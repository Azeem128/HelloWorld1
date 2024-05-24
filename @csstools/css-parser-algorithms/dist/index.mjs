import{isTokenEOF as e,TokenType as n,isToken as t,stringify as o,mirrorVariant as s,isTokenOpenParen as i,isTokenOpenCurly as r,isTokenOpenSquare as a,isTokenFunction as c,isTokenWhitespace as u,isTokenComment as l,ParseError as d,isTokenCloseParen as h,isTokenWhiteSpaceOrComment as p,mirrorVariantType as m,isTokenComma as k}from"@csstools/css-tokenizer";var f;function walkerIndexGenerator(e){let n=e.slice();return(e,t,o)=>{let s=-1;for(let i=n.indexOf(t);i<n.length&&(s=e.indexOf(n[i]),-1===s||s<o);i++);return-1===s||s===o&&t===e[o]&&(s++,s>=e.length)?-1:(n=e.slice(),s)}}function consumeComponentValue(e,n){const t=n[0];if(i(t)||r(t)||a(t)){const t=consumeSimpleBlock(e,n);return{advance:t.advance,node:t.node}}if(c(t)){const t=consumeFunction(e,n);return{advance:t.advance,node:t.node}}if(u(t)){const t=consumeWhitespace(e,n);return{advance:t.advance,node:t.node}}if(l(t)){const t=consumeComment(e,n);return{advance:t.advance,node:t.node}}return{advance:1,node:new TokenNode(t)}}!function(e){e.Function="function",e.SimpleBlock="simple-block",e.Whitespace="whitespace",e.Comment="comment",e.Token="token"}(f||(f={}));class ContainerNodeBaseClass{value=[];indexOf(e){return this.value.indexOf(e)}at(e){if("number"==typeof e)return e<0&&(e=this.value.length+e),this.value[e]}forEach(e,n){if(0===this.value.length)return;const t=walkerIndexGenerator(this.value);let o=0;for(;o<this.value.length;){const s=this.value[o];let i;if(n&&(i={...n}),!1===e({node:s,parent:this,state:i},o))return!1;if(o=t(this.value,s,o),-1===o)break}}walk(e,n){0!==this.value.length&&this.forEach(((n,t)=>!1!==e(n,t)&&((!("walk"in n.node)||!this.value.includes(n.node)||!1!==n.node.walk(e,n.state))&&void 0)),n)}}class FunctionNode extends ContainerNodeBaseClass{type=f.Function;name;endToken;constructor(e,n,t){super(),this.name=e,this.endToken=n,this.value=t}getName(){return this.name[4].value}normalize(){e(this.endToken)&&(this.endToken=[n.CloseParen,")",-1,-1,void 0])}tokens(){return e(this.endToken)?[this.name,...this.value.flatMap((e=>e.tokens()))]:[this.name,...this.value.flatMap((e=>e.tokens())),this.endToken]}toString(){const e=this.value.map((e=>t(e)?o(e):e.toString())).join("");return o(this.name)+e+o(this.endToken)}toJSON(){return{type:this.type,name:this.getName(),tokens:this.tokens(),value:this.value.map((e=>e.toJSON()))}}isFunctionNode(){return FunctionNode.isFunctionNode(this)}static isFunctionNode(e){return!!e&&(e instanceof FunctionNode&&e.type===f.Function)}}function consumeFunction(n,t){const o=[];let s=1;for(;;){const i=t[s];if(!i||e(i))return n.onParseError(new d("Unexpected EOF while consuming a function.",t[0][2],t[t.length-1][3],["5.4.9. Consume a function","Unexpected EOF"])),{advance:t.length,node:new FunctionNode(t[0],i,o)};if(h(i))return{advance:s+1,node:new FunctionNode(t[0],i,o)};if(p(i)){const e=consumeAllCommentsAndWhitespace(n,t.slice(s));s+=e.advance,o.push(...e.nodes);continue}const r=consumeComponentValue(n,t.slice(s));s+=r.advance,o.push(r.node)}}class SimpleBlockNode extends ContainerNodeBaseClass{type=f.SimpleBlock;startToken;endToken;constructor(e,n,t){super(),this.startToken=e,this.endToken=n,this.value=t}normalize(){if(e(this.endToken)){const e=s(this.startToken);e&&(this.endToken=e)}}tokens(){return e(this.endToken)?[this.startToken,...this.value.flatMap((e=>e.tokens()))]:[this.startToken,...this.value.flatMap((e=>e.tokens())),this.endToken]}toString(){const e=this.value.map((e=>t(e)?o(e):e.toString())).join("");return o(this.startToken)+e+o(this.endToken)}toJSON(){return{type:this.type,startToken:this.startToken,tokens:this.tokens(),value:this.value.map((e=>e.toJSON()))}}isSimpleBlockNode(){return SimpleBlockNode.isSimpleBlockNode(this)}static isSimpleBlockNode(e){return!!e&&(e instanceof SimpleBlockNode&&e.type===f.SimpleBlock)}}function consumeSimpleBlock(n,t){const o=m(t[0][0]);if(!o)throw new Error("Failed to parse, a mirror variant must exist for all block open tokens.");const s=[];let i=1;for(;;){const r=t[i];if(!r||e(r))return n.onParseError(new d("Unexpected EOF while consuming a simple block.",t[0][2],t[t.length-1][3],["5.4.8. Consume a simple block","Unexpected EOF"])),{advance:t.length,node:new SimpleBlockNode(t[0],r,s)};if(r[0]===o)return{advance:i+1,node:new SimpleBlockNode(t[0],r,s)};if(p(r)){const e=consumeAllCommentsAndWhitespace(n,t.slice(i));i+=e.advance,s.push(...e.nodes);continue}const a=consumeComponentValue(n,t.slice(i));i+=a.advance,s.push(a.node)}}class WhitespaceNode{type=f.Whitespace;value;constructor(e){this.value=e}tokens(){return this.value}toString(){return o(...this.value)}toJSON(){return{type:this.type,tokens:this.tokens()}}isWhitespaceNode(){return WhitespaceNode.isWhitespaceNode(this)}static isWhitespaceNode(e){return!!e&&(e instanceof WhitespaceNode&&e.type===f.Whitespace)}}function consumeWhitespace(e,n){let t=0;for(;;){const e=n[t];if(!u(e))return{advance:t,node:new WhitespaceNode(n.slice(0,t))};t++}}class CommentNode{type=f.Comment;value;constructor(e){this.value=e}tokens(){return[this.value]}toString(){return o(this.value)}toJSON(){return{type:this.type,tokens:this.tokens()}}isCommentNode(){return CommentNode.isCommentNode(this)}static isCommentNode(e){return!!e&&(e instanceof CommentNode&&e.type===f.Comment)}}function consumeComment(e,n){return{advance:1,node:new CommentNode(n[0])}}function consumeAllCommentsAndWhitespace(e,n){const t=[];let o=0;for(;;)if(u(n[o])){const e=consumeWhitespace(0,n.slice(o));o+=e.advance,t.push(e.node)}else{if(!l(n[o]))return{advance:o,nodes:t};t.push(new CommentNode(n[o])),o++}}class TokenNode{type=f.Token;value;constructor(e){this.value=e}tokens(){return[this.value]}toString(){return this.value[1]}toJSON(){return{type:this.type,tokens:this.tokens()}}isTokenNod(){return TokenNode.isTokenNode(this)}static isTokenNode(e){return!!e&&(e instanceof TokenNode&&e.type===f.Token)}}function parseComponentValue(t,o){const s={onParseError:o?.onParseError??(()=>{})},i=[...t];e(i[i.length-1])&&i.push([n.EOF,"",i[i.length-1][2],i[i.length-1][3],void 0]);const r=consumeComponentValue(s,i);if(e(i[Math.min(r.advance,i.length-1)]))return r.node;s.onParseError(new d("Expected EOF after parsing a component value.",t[0][2],t[t.length-1][3],["5.3.9. Parse a component value","Expected EOF"]))}function parseListOfComponentValues(t,o){const s={onParseError:o?.onParseError??(()=>{})},i=[...t];e(i[i.length-1])&&i.push([n.EOF,"",i[i.length-1][2],i[i.length-1][3],void 0]);const r=[];let a=0;for(;;){if(!i[a]||e(i[a]))return r;const n=consumeComponentValue(s,i.slice(a));r.push(n.node),a+=n.advance}}function parseCommaSeparatedListOfComponentValues(t,o){const s={onParseError:o?.onParseError??(()=>{})},i=[...t];if(0===t.length)return[];e(i[i.length-1])&&i.push([n.EOF,"",i[i.length-1][2],i[i.length-1][3],void 0]);const r=[];let a=[],c=0;for(;;){if(!i[c]||e(i[c]))return a.length&&r.push(a),r;if(k(i[c])){r.push(a),a=[],c++;continue}const n=consumeComponentValue(s,t.slice(c));a.push(n.node),c+=n.advance}}function gatherNodeAncestry(e){const n=new Map;return e.walk((e=>{Array.isArray(e.node)?e.node.forEach((t=>{n.set(t,e.parent)})):n.set(e.node,e.parent)})),n}function forEach(e,n,t){if(0===e.length)return;const o=walkerIndexGenerator(e);let s=0;for(;s<e.length;){const i=e[s];let r;if(t&&(r={...t}),!1===n({node:i,parent:{value:e},state:r},s))return!1;if(s=o(e,i,s),-1===s)break}}function walk(e,n,t){0!==e.length&&forEach(e,((t,o)=>!1!==n(t,o)&&((!("walk"in t.node)||!e.includes(t.node)||!1!==t.node.walk(n,t.state))&&void 0)),t)}function replaceComponentValues(e,n){for(let t=0;t<e.length;t++){walk(e[t],((e,t)=>{if("number"!=typeof t)return;const o=n(e.node);o&&(Array.isArray(o)?e.parent.value.splice(t,1,...o):e.parent.value.splice(t,1,o))}))}return e}function stringify(e){return e.map((e=>e.map((e=>o(...e.tokens()))).join(""))).join(",")}function isSimpleBlockNode(e){return SimpleBlockNode.isSimpleBlockNode(e)}function isFunctionNode(e){return FunctionNode.isFunctionNode(e)}function isWhitespaceNode(e){return WhitespaceNode.isWhitespaceNode(e)}function isCommentNode(e){return CommentNode.isCommentNode(e)}function isTokenNode(e){return TokenNode.isTokenNode(e)}function sourceIndices(e){if(Array.isArray(e)){const n=e[0];if(!n)return[0,0];const t=e[e.length-1]||n;return[sourceIndices(n)[0],sourceIndices(t)[1]]}const n=e.tokens(),t=n[0],o=n[n.length-1];return t&&o?[t[2],o[3]]:[0,0]}export{CommentNode,f as ComponentValueType,ContainerNodeBaseClass,FunctionNode,SimpleBlockNode,TokenNode,WhitespaceNode,forEach,gatherNodeAncestry,isCommentNode,isFunctionNode,isSimpleBlockNode,isTokenNode,isWhitespaceNode,parseCommaSeparatedListOfComponentValues,parseComponentValue,parseListOfComponentValues,replaceComponentValues,sourceIndices,stringify,walk,walkerIndexGenerator};

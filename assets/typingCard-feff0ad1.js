var u=Object.defineProperty;var d=(n,t,e)=>t in n?u(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var r=(n,t,e)=>(d(n,typeof t!="symbol"?t+"":t,e),e);import{r as c,j as h,n as p}from"./index-e38a95ae.js";class f{constructor(t){r(this,"opts");r(this,"source");r(this,"output");r(this,"delay");r(this,"chain");r(this,"done");r(this,"timer");this.opts=t||{},this.source=t.source,this.output=t.output,this.delay=t.delay||120,this.chain={parent:null,dom:this.output,val:[]},(!this.opts.done||typeof this.opts.done!="function")&&(this.opts.done=function(){})}init(){this.chain.val=this.convert(this.source,this.chain.val)}convert(t,e){var i;let s=Array.from(t.childNodes);for(let o=0;o<s.length;o++){let l=s[o];if(l.nodeType===3)e=e.concat((i=l==null?void 0:l.nodeValue)==null?void 0:i.split(""));else if(l.nodeType===1){let a=[];a=this.convert(l,a),e.push({dom:l,val:a})}}return e}print(t,e,s){let i=this;this.timer=setTimeout(function(){i.destory(),t.appendChild(document.createTextNode(e)),s()},this.delay)}destory(){this.timer&&clearTimeout(this.timer)}play(t){if(!t.val.length){t.parent?this.play(t.parent):this.opts.done&&this.opts.done();return}let e=t.val.shift();if(typeof e=="string")this.print(t.dom,e,()=>{this.play(t)});else{let s=e.dom.cloneNode();t.dom.appendChild(s),this.play({parent:t,dom:s,val:e.val})}}start(){this.init(),console.log("chain===",this.chain),this.play(this.chain)}}const v=n=>{const{title:t,source:e}=n,s=c.useRef(null),i=c.useRef(null);return c.useEffect(()=>{i.current&&i.current.innerHTML&&(i.current.innerHTML="");const o=new f({source:s.current,output:i.current,delay:30});return console.log("typing===",o),o.destory(),o.start(),()=>{o.destory()}},[t,e]),h.jsxs(p,{bordered:!1,className:"card-item",title:t,children:[h.jsx("div",{style:{display:"none"},ref:s,dangerouslySetInnerHTML:{__html:e}}),h.jsx("div",{ref:i})]})};export{v as T};
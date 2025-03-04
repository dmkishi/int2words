(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerPolicy&&(i.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?i.credentials="include":t.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}})();class w extends Error{constructor(r){super(r),this.name="CoercionError"}}function y(e,r){const n=x(r);return typeof e=="string"?e===""?n("Expected a non-empty string."):isNaN(Number(e))?n("Failed to extract number."):h(Number(e),n):typeof e=="number"?h(e,n):n("Expected a string or number.")}function h(e,r){return Number.isInteger(e)?e<0?r("Expected a positive integer."):e>Number.MAX_SAFE_INTEGER?r(`Integers greater than ${Number.MAX_SAFE_INTEGER} not supported.`):!0:r("Expected an integer.")}function x(e){return function(n){const o=new w(n);if(e)throw o;return console.error(o.toString()),!1}}function v(e,r){const n=[],o=String(e).split("").reverse();for(let t=0;;t+=r){const s=o.slice(t,t+r).reverse();if(s.length===r)n.push(p(s));else{if(s.length>0){const f=[...Array(r-s.length).fill("0"),...s];n.push(p(f))}break}}return n}function p(e){return e.map(r=>Number(r))}const m=["","一","二","三","四","五","六","七","八","九"],g=["","十","百","千"],P=["","万","億","兆","京","垓","𥝱","穣"],T={throwError:!1};function S(e,r=T){if(!y(e,r.throwError))return"";const n=Number(e),t=v(n,4).map(i=>j(i));return O(t)}function j(e){const[r,n,o,t]=e,i=l(r,4),s=l(n,3),d=l(o,2),f=l(t,1);return`${i}${s}${d}${f}`}function l(e,r){const n=r-1;return n===0?m[e]:e===0?"":e===1?g[n]:m[e]+g[n]}function O(e){let r="";return e.forEach((n,o)=>{const t=P[o];t!==""&&n==="千"?r="一"+n+t+r:r=n+t+r}),r||"零"}const a=["","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],E=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],q=["","thousand","million","billion","trillion","quadrillion","quintillion","sextillion","septillion","octillion","nonillion"],$={throwError:!1,hyphenate:!0};function A(e,r=$){if(!y(e,r.throwError))return"";const n=Number(e),t=v(n,3).map(i=>k(i));return L(t)}function k(e){const[r,n,o]=e,t=[];switch(r!==0&&t.push(`${a[r]} hundred`),n){case 0:o!==0&&t.push(a[o]);break;case 1:t.push(a[10+o]);break;default:o===0?t.push(E[n]):t.push(`${E[n]}-${a[o]}`);break}return t.join(" ")}function L(e){const r=[];return e.forEach((n,o)=>{if(n==="")return;const t=q[o],i=t===""?n:`${n} ${t}`;r.push(i)}),r.reverse().join(" ")||"zero"}const u=document.querySelector("#integer"),W=document.querySelectorAll(".preset"),c={english:document.querySelector('output[name="english"]'),japanese:document.querySelector('output[name="japanese"]'),error:document.querySelector('output[name="error"]')},b=window.matchMedia("(pointer: coarse)").matches;function N(){if(!u||!c.english||!c.japanese||!c.error)throw new Error("Missing HTML elements.");try{c.english.innerText=A(u.value),c.error.innerText=""}catch(e){throw c.english.innerText="",c.japanese.innerText="",e instanceof w&&(c.error.innerText=e.message),e}c.japanese.innerText=S(u.value)}if(!u)throw new Error("Missing <input> element.");N();u.addEventListener("input",N);W.forEach(e=>{e.addEventListener("click",()=>{u.value=e.value,u.dispatchEvent(new Event("input")),b||u.focus()})});b&&(u.blur(),u.addEventListener("focus",()=>{window.innerWidth<480&&setTimeout(()=>{u.scrollIntoView({behavior:"smooth",block:"start",inline:"nearest"})},0)}));

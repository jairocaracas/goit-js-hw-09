function e(e){return e&&e.__esModule?e.default:e}var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},r=o.parcelRequire7bc7;null==r&&((r=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,o){t[e]=o},o.parcelRequire7bc7=r);var l=r("7Y9D8");document.querySelector(".form");const u=document.querySelector('input[name="delay"]'),s=document.querySelector('input[name="step"]'),a=document.querySelector('input[name="amount"]');function c(e,o){const n=Math.random()>.3;return new Promise(((t,i)=>{setTimeout((()=>{n?t({position:e,delay:o}):i({position:e,delay:o})}),o)}))}document.querySelector('button[type="submit"]').addEventListener("click",(function(o){if(o.preventDefault(),u.value<=0||s.value<=0||a.value<=0)e(l).Notify.warning("Por favor ingrese un valor correcto en todos los campos");else for(i=0;i<a.value;i++)delayIncresing=Number(u.value)+i*Number(s.value),c(i+1,delayIncresing).then((({position:o,delay:n})=>{e(l).Notify.success(`✅ Fulfilled promise ${o} in ${n}ms`),console.log(`✅ Fulfilled promise ${o} in ${n}ms`)})).catch((({position:o,delay:n})=>{e(l).Notify.failure(`❌ Rejected promise ${o} in ${n}ms`),console.log(`❌ Rejected promise ${o} in ${n}ms`)}))}));
//# sourceMappingURL=03-promises.b9384616.js.map

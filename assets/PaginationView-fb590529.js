import{_ as o,o as n,c as i,a,n as l,j as c,F as r,g,t as d}from"./index-c6ca4b97.js";const _={props:["pages","getProducts"]},u={class:"my-3 flex-xy-center"},p={"aria-label":"Products's Pagination"},k={class:"pagination"},m=["onClick"];function v(P,s,e,f,x,C){return n(),i("div",u,[a("nav",p,[a("ul",k,[a("li",{class:l(["page-item",{disabled:!e.pages.has_pre}])},[a("a",{class:"page-link",onClick:s[0]||(s[0]=c(t=>e.getProducts(e.pages.current_page-1),["prevent"]))},"上一頁")],2),(n(!0),i(r,null,g(e.pages.total_pages,t=>(n(),i("li",{class:l(["page-item",{active:e.pages.current_page===t}]),key:t+123},[a("a",{class:"page-link",onClick:c(h=>e.getProducts(t),["prevent"])},d(t),9,m)],2))),128)),a("li",{class:l(["page-item",{disabled:!e.pages.has_next}])},[a("a",{class:"page-link",onClick:s[1]||(s[1]=c(t=>e.getProducts(e.pages.current_page+1),["prevent"]))},"下一頁")],2)])])])}const b=o(_,[["render",v]]);export{b as P};
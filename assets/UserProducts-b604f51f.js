import{_ as u,o,c as e,f as v,r as l,a as t,F as h,g,b as p,t as i}from"./index-4ac1f08f.js";import{P as b}from"./PaginationView-9b9339a1.js";const x={},w={class:"banner-pages position-relative mb-4"},y=v('<img class="w-100" style="height:15rem;object-fit:cover;" src="https://images.unsplash.com/photo-1527904324834-3bda86da6771?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1704&amp;q=80" alt=""><div class="banner-title position-absolute d-flex top-0 bottom-0 start-0 end-0 m-auto justify-content-center align-items-center"><div class="text-white fs-3 text-center"><div class="fs-3">商品一覽</div><div class="fs-5 mt-2">Products</div></div></div>',2),P=[y];function $(n,a){return o(),e("div",w,P)}const V=u(x,[["render",$]]);const{VITE_URL:B,VITE_PATH:E}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"ziyi",BASE_URL:"/sideproject-pocket-donut/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},L={data(){return{products:[],pagination:{}}},components:{PaginationView:b},mounted(){this.getProducts()},methods:{getProducts(n=1){const a=`${B}/api/${E}/products/?page=${n}`;this.$http.get(a).then(c=>{console.log("產品列表",c),this.products=c.data.products,this.pagination=c.data.pagination})}}},T={class:"container"},D={class:"row"},j=t("div",{class:"col-12 col-md-3"},[t("div",{class:"product-category"})],-1),k={class:"col-12 col-md-9"},H={class:"product-list"},R={class:"row row-cols-1 row-cols-sm-2 row-cols-lg-3"},S={class:"card border-0 shadow-sm"},U=["src"],A={class:"card-body"},I={class:"item-category"},M={class:"badge rounded-pill bg-primary fw-normal"},N={class:"item-info my-3"},F={class:"item-title mb-2 fs-4 fw-bold"},G={class:"item-price text-danger fw-bolder fs-5"},O={class:"w-100 d-flex"},q={class:"form-select rounded-start"},z=["value"],C=t("button",{type:"button",class:"add-cart btn text-white px-4 ms-2"},[t("span",{class:"material-symbols-outlined"},"add_shopping_cart")],-1);function W(n,a,c,f,d,m){const r=l("PaginationView");return o(),e("div",T,[t("div",D,[j,t("div",k,[t("div",H,[t("div",R,[(o(!0),e(h,null,g(d.products,s=>(o(),e("div",{key:s.id,class:"col mb-3"},[t("div",S,[t("img",{src:s.imageUrl,alt:"item.title",class:"card-img-top",style:{height:"16rem","object-fit":"cover"}},null,8,U),t("div",A,[t("div",I,[t("div",M,i(s.category),1)]),t("div",N,[t("div",F,i(s.title),1),t("div",G,"NT$ "+i(s.price),1)]),t("div",O,[t("select",q,[(o(),e(h,null,g(20,_=>t("option",{value:_,key:_+123},i(_),9,z)),64))]),C])])])]))),128))])]),p(r,{pages:d.pagination,"get-products":m.getProducts},null,8,["pages","get-products"])])])])}const Y=u(L,[["render",W]]),J={components:{BannerPages:V,ProductsList:Y}},K={class:"products"};function Q(n,a,c,f,d,m){const r=l("BannerPages"),s=l("ProductsList");return o(),e("div",K,[p(r),p(s)])}const tt=u(J,[["render",Q]]);export{tt as default};

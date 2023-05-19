// main.js

window.onload = function () {

/* 햄버거버튼 */

const gnbBtn = document.querySelector('div.gnb_btn');
const sitemap = document.querySelector('div.sitemap_wrap');
const sitemapCloseBtn = document.querySelector('nav.sitemap button')

gnbBtn.addEventListener('click', e => {
    e.preventDefault();
    sitemap.classList.add("on")
    
})

sitemapCloseBtn.addEventListener('click', e => {
    e.preventDefault();
    sitemap.classList.remove("on");
})

/* 주메뉴 */
const gnbMenu = document.querySelectorAll("nav.gnb>ul>li");
const headerBg = document.querySelector("div.header_bg");
const headerInner = document.querySelector("div.header_inner");
console.log(gnbMenu);

for(let i = 0; i<gnbMenu.length; i++){
    gnbMenu[i].addEventListener('mouseover', () => {
        headerBg.classList.add('open');
        headerInner.classList.add('open');
    });//mouseover

    gnbMenu[i].addEventListener('mouseout', () => {
        headerBg.classList.remove('open');
        headerInner.classList.remove('open');

    });//mouseouse

    gnbMenu[i].addEventListener('focus', () => {
        headerBg.classList.add('open');
        headerInner.classList.add('open');

    });//focus

    gnbMenu[i].addEventListener('blur', () => {
        headerBg.classList.remove('open');
        headerInner.classList.remove('open');

    });//blur
}



/* 원스크롤  */

const lis = document.querySelectorAll("ul.scroll_nav_bar>li");
console.log(lis);
const sections = document.querySelectorAll("section");

let devHeight = window.innerHeight;

window.addEventListener('resize', () => {
    devHeight = window.innerHeight;
});

/* 화면 min-width 800 이하일 시 스크롤 네비 사라짐 */
const scrollNav = document.querySelector("aside.scroll_nav")


// if(devHeight<800){
//     scrollNav.classList.add("remove");
// }else{
//     scrollNav.classList.remove("remove");
// }
// for(let i=0; i<sections.length; i++){
//     sections[i].style.height = `${devHeight}px`;

// }

let activation = (index, list) => {
    for(let el of list){
        el.classList.remove("on");
    }
    list[index].classList.add("on");
};

let activation2 = (scrTop) => {
    window.scroll({
        top:scrTop,
        left:0,
        behavior:'smooth'
    });
    for(let i = 0; i<sections.length; i++){
        if(scrTop>=i*devHeight && scrTop<(i+1)*devHeight){
            activation(i,sections);
            secBlack(i);
            
        }
    };
}


const scrollCurP = document.querySelector(".scroll_nav span.cur_p");
const curA = document.querySelectorAll('.scroll_nav_bar>li>a');

console.log(curA)



for(let i = 0; i<sections.length; i++){

    let curP = curA[i].className;   
    let curN = Number(curP);
    console.log(curN);
    let chars = sections[i].querySelectorAll(".char");
    let delay = 0.1;
    console.log(chars);

    //글자 애니메이션 딜레이
    for(k=0; k<chars.length; k++){
        chars[k].style.transitionDelay = `${delay * k}s`
    }

    //wheel 이벤트
    sections[i].addEventListener('wheel', e =>{
        if(e.deltaY<0){//scroll up
            let prev = e.currentTarget.previousElementSibling.offsetTop;
            activation2(prev);
            lis[i].classList.remove("on");
            scrollCurP.innerHTML = `0${curN-1}`;
            
        }
        else if(e.deltaY>0){//scroll down
            let next = e.currentTarget.nextElementSibling.offsetTop;
            activation2(next);
            lis[i+1].classList.add("on");
            scrollCurP.innerHTML = `0${curN+1}`;
            

        }
        lis[i].addEventListener("click", e => {
            e.preventDefault();
            lis[i].classList.add("on");
            activation2(devHeight*i)           
        })
       
       
    });


}
 



// section .black 있으면 각요소에 .black 붙이기

const scrollDown = document.querySelector(".scroll_down");


let secBlack = sectionNumber => {
    if(sections[sectionNumber].classList.contains('black')){
        headerInner.classList.add('black')
        scrollNav.classList.add('black');
        scrollDown.classList.add('black');
    }else{        
        headerInner.classList.remove('black')
        scrollNav.classList.remove('black');
        scrollDown.classList.remove('black');
    }
}



/* content1 배너*/
const secureList = document.querySelector("div.secure_list")
const myBanner = document.querySelector(".secure_list>ul");
const prevBtn = document.querySelector(".count_box>button.prev_btn");
const nextBtn = document.querySelector(".count_box>button.next_btn");
let bnnNum = 0;
let lastNum = document.querySelectorAll(".secure_list>ul>li").length - 1;
console.log(lastNum);
let bnnW = myBanner.children[0].offsetWidth;
console.log(bnnW);
let margin = 50;
const myBannerClone = myBanner.cloneNode(true);
myBanner.classList = "original";
myBannerClone.classList = 'clone';

myBanner.appendChild(myBannerClone);

const bCurN = document.querySelector(".content1 .cur_num");
console.log(bCurN)


nextBtn.addEventListener("click", e => {
    e.preventDefault();
    bnnNum++;
    
    // myBanner.style.left = `${bnnNum * -390}px`

    // let lastIndex = myBanner.children.length-1;//마지막 인덱스번호
    // let lastList = myBanner.cloneNode(true); //ul복제
    // myBanner.removeChild(myBanner.children[lastIndex]);
    // myBanner.insertBefore(lastList,myBanner.children[0]);
    if(bnnNum>lastNum){
        bnnNum=0;
        
    }
    myBanner.style.left = `${bnnNum * -(bnnW + margin)}px`
    bCurN.innerHTML = `0${bnnNum+1}`
    loadBar.style.setProperty('--loadAfterWidth',`${(bnnNum+1) * 25}%`)
})
prevBtn.addEventListener("click", e => {
    e.preventDefault();
    bnnNum--;
    if(bnnNum <0){bnnNum =lastNum;}
    myBanner.style.left = `${bnnNum * -(bnnW + margin)}px`
    bCurN.innerHTML = `0${bnnNum+1}`
    loadBar.style.setProperty('--loadAfterWidth',`${(bnnNum+1) * 25}%`)
});

// function loadAni (){
// const loadBar = document.querySelector(".count_box span.loading");
// console.log(loadBar);
// let loadAfter = window.getComputedStyle(loadBar, '::after');
// console.log(loadAfter.animation);
// loadBar.style.setProperty('--loadAni','load 5s linear 0s');
// }

const loadBar = document.querySelector("span.loading");
let loadBarAfter = window.getComputedStyle(loadBar, "::after");
console.log(loadBarAfter.width);


//오토배너 작동 - setTimeout 사용
function autoBanner(){
    bnnNum++
    if(bnnNum>lastNum)bnnNum=0;
    myBanner.style.left = `${bnnNum * -(bnnW + margin)}px`;
    bCurN.innerHTML = `0${bnnNum+1}`;
    loadBar.style.setProperty('--loadAfterWidth',`${(bnnNum+1) * 25}%`)
    // if(loadBar.classList.contains("on")){
    //     loadBar.classList.remove("on");
    // }else{
    //     loadBar.classList.add("on");
    // }
    
   
    autoBnn = setTimeout (autoBanner,5000)
}
let autoBnn = setTimeout(autoBanner,5000);

/* content3 */

//partner 롤링배너

const parListRightBox = document.querySelector("div.par_list_right");
const parListLeftBox = document.querySelector("div.par_list_left");

const rightRoller = document.querySelector(".roller_right");
const leftRoller = document.querySelector(".roller_left");

let rightClone = rightRoller.cloneNode(true);
let leftClone = leftRoller.cloneNode(true);

parListRightBox.appendChild(rightClone);
parListLeftBox.appendChild(leftClone);

rightRoller.classList.add("right_original");
leftRoller.classList.add("left_original");

rightClone.classList.add("right_clone");
leftClone.classList.add("left_clone");

const mainTxtArea = document.querySelector("div.main_txt");

 // scrolldown, btn_top, btn_con 위치변경

 const btnTop = document.querySelector("button.btn_top");
 const btnContact = document.querySelector("a.btn_con");

 

let start = setTimeout(()=>{
    sections[0].classList.add("on");
    headerInner.classList.add("active");
    scrollDown.classList.add("active");
    mainTxtArea.classList.add("active");
    scrollNav.classList.add("active");
    btnContact.classList.add("active");
},500);

window.addEventListener('scroll', ()=>{
    let scroll = document.querySelector('html').scrollTop;
    console.log(scroll);
    if(scroll > 4000){
        scrollNav.classList.add("hide");
        scrollDown.classList.add("hide");
        btnTop.classList.add("hide");
        btnContact.classList.add("hide");
        
    }else{
        scrollDown.classList.remove("hide");
        btnTop.classList.remove("hide");
        btnContact.classList.remove("hide");
        scrollNav.classList.remove("hide");
    }

    if(scroll<=100){
        btnTop.style.display = "none";
        btnContact.classList.remove("show");
    }else{
        btnTop.style.display ="block";
        btnContact.classList.add("show");
       
    }
 })

 //top 버튼

 btnTop.addEventListener('click', e =>{
    e.preventDefault();
    window.scroll({
        top:0,
        left:0,
        behavior:'smooth'
    });

 })

}


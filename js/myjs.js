 //1、项目中有哪些类？轮播图

 class Banner{
    //构造函数
    //boxDom：轮播图的容器
    constructor(boxDom,obj){
        //默认值
        let defaultObj = {
            //dom相关属性:
            imgDoms:[],//存放动态创建的img标签
            liDoms:[],//存放动态创建的li标签
            //图片属性
            width:400,
            height:300,
            imgs:["img/1.jpg","img/2.jpg","img/3.jpg"],
            type:"fade", //"fade,slide"
            //豆豆相关
            douColor:null,
            douHighColor:null,
            douSize:0,
            isCircle:false,
            //动态
            currIndex :0,//当前图片的下标
            timeSpace:2000,
            myTimer:null
        }
        this.boxDom = boxDom;
        for(let key in defaultObj){

            this[key] = (obj[key]==undefined?defaultObj[key]:obj[key]) ;
        }
        this.render();
        this.addEvent();
        this.autoPlay();
    }
    //方法：
    //创建dom元素的
    render(){
        //一、改变容器的样式
        this.boxDom.style.position = "relative";
        this.boxDom.style.overflow = "hidden";
        
        //1、创建图片的盒子及其图片
        // 1）、图片容器
        let divDom = document.createElement("div");
        divDom.style.cssText = `
            position: absolute;
            left: 0;
            top:0;
            width: 100%;
            height: 100%;
        `;
        this.boxDom.appendChild(divDom);
        //2）、图片
        for(let i in this.imgs){
            let imgDom = document.createElement("img");
            imgDom.src = this.imgs[i];
            imgDom.style.cssText = `
                position: absolute;
                left: 0;
                top:0;
                width: 100%;
                height: 100%;
            `;
            switch(this.type){
               case  "fade" : imgDom.style.opacity = 0;break;
               case  "slide" :imgDom.style.left = this.width+"px";break;
            }
            if(i=="0"){
                switch(this.type){
                    case  "fade" : imgDom.style.opacity = 1;;break;
                    case  "slide" :imgDom.style.left = "0";break;
                }
            }
            divDom.appendChild(imgDom);
            this.imgDoms.push(imgDom);
        }

        //2、创建豆豆
        //1）、ul
        let ulDom = document.createElement("ul");
        ulDom.style.cssText =`
            list-style: none;
            position: absolute;
            left: ${(this.width-this.douSize*this.imgs.length*2)/2}px;
            top: ${this.height-this.douSize*2}px;
            width: 100%;
            height: 100%;
        `;
        this.boxDom.appendChild(ulDom);
        //2)、li
        for(let i in this.imgs){
            let liDom = document.createElement("li");
            liDom.style.cssText = `
                float: left;
                margin-right: ${this.douSize}px;
                width: ${this.douSize}px;
                height: ${this.douSize}px;
                background-color: ${this.douColor};
            `;
            if(this.isCircle){
                liDom.style.borderRadius="50%";
            }
            if(i=="0"){
                liDom.style.backgroundColor = this.douHighColor;
            }
            ulDom.appendChild(liDom);
            this.liDoms.push(liDom);
        }
    }

    autoPlay(){
        this.myTimer =  setInterval(()=>{
            this.goImg(this.currIndex+1);
        },this.timeSpace);
    }

    // stopPlay(){
    //     clearInterval(this.myTimer);
    // }

    goImg(index){
        //一、处理数据
        //1、计算数据
        //outIndex：离开图片的下标
        let outIndex = this.currIndex;
        this.currIndex = index;
        //2、边界处理
        if(this.currIndex>this.imgs.length-1){
            this.currIndex = 0;
        }

        //二、处理外观
        //改变图片
        switch(this.type){
            case  "fade" : fadeInOut(this.imgDoms[outIndex],this.imgDoms[this.currIndex],this.timeSpace/3);break;
            case  "slide" :slide(this.imgDoms[outIndex],this.imgDoms[this.currIndex],-1*this.width,this.timeSpace/3);break;
        }   
        //改变豆豆
        this.liDoms[outIndex].style.backgroundColor = this.douColor;
        this.liDoms[this.currIndex].style.backgroundColor = this.douHighColor;
    }

    //添加事件
    addEvent(){
        // this.boxDom.onmouseover = ()=>{
        //     this.stopPlay();
        // }

        this.boxDom.ssonmouseout = ()=>{
            this.autoPlay();
        }

        for(let i=0;i<this.liDoms.length;i++){
            this.liDoms[i].onclick = ()=>{
               this.goImg(i);
            }
        }
    }
}

  window.onload = function(){
    //2、流程
    let b1 = new Banner(
        document.getElementById("box1"),
        { 
            width:150,
            height:150,
            imgs:["img/logo.jpg","img/logo1.jpg"]
        }
    );
    let b2 = new Banner(
        document.getElementById("box2"),{
          width:1400,
          height:500,
          imgs:["img/lbt01.jpg","img/lbt02.jpg","img/lbt03.jpg","img/lbt04.jpg","img/lbt05.jpg"],
          douColor:"#464343",
          douHighColor:"#fff",
          douSize:10,
          isCircle:false,
          timeSpace:5000,
        }
    );
   
}




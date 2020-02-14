new Vue({
	el:"#app",
	data:{
	  isStart:1,	
	  score:10, //消耗积分
      list:[
	  	{img:'img/j1.png',title:'矿泉水一瓶'},
		{img:'img/j2.png',title:'一盆多肉'},
		{img:'img/j1.png',title:'7.5元红包'},
		{img:'img/j2.png',title:'矿泉水一瓶'},
		{img:'img/j1.png',title:'100元红包'},
		{img:'img/j2.png',title:'矿泉水一瓶'},
		{img:'img/j1.png',title:'5元红包'},
		{img:'img/j2.png',title:'矿泉水一瓶'}
	  ],   //奖品1-9     
      index: -1,  // 当前转动到哪个位置，起点位置
      count: 8,  // 总共有多少个位置
      timer: 0,  // 每次转动定时器
      speed: 200,  // 初始转动速度
      times: 0,    // 转动次数
      cycle: 50,   // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1,   // 中奖位置
      click: true,
      showToast: false, //显示中奖弹窗        
	},
	
	mounted(){},
	
	methods:{
		startLottery(){
			if (!this.click) { return }
			if (JSON.parse(window.localStorage.getItem("isOver"))) {
				alert(
				  "别太贪了！你已经抽过了，你那点小心思我再不懂？没看到下面写着新用户只能免费抽一次么？你重新刷新也没用！哈哈哈"
				);
			  } else {
				window.localStorage.setItem("isOver", JSON.stringify(true));
				this.startRoll(); 
			  }
			  
		},		
		// 开始转动
		startRoll () {
			this.times += 1 // 转动次数
			this.oneRoll() // 转动过程调用的每一次转动方法，这里是第一次调用初始化 
			// 如果当前转动次数达到要求 && 目前转到的位置是中奖位置
			if (this.times > this.cycle + 10 && this.prize === this.index) {
			  clearTimeout(this.timer)  // 清除转动定时器，停止转动
			  this.prize = -1
			  this.times = 0
			  this.speed = 200
			  this.click = true; 
			  var that = this;
			  setTimeout(res=>{
				that.showToast = true;
			  },500)			                  
			} else {
			  if (this.times < this.cycle) {
				this.speed -= 10  // 加快转动速度
			  } else if (this.times === this.cycle) { 
				const index = parseInt(Math.random() * 10, 0) || 0;  // 随机获得一个中奖位置
          		this.prize = index; //中奖位置,可由后台返回 
				if (this.prize > 7) { this.prize = 7 }
			  } else if (this.times > this.cycle + 10 && ((this.prize === 0 && this.index === 7) || this.prize === this.index + 1)) {
				this.speed += 110
			  } else {
				this.speed += 20
			  }      
			  if (this.speed < 40) {this.speed = 40}
			  this.timer = setTimeout(this.startRoll, this.speed)
			}
		},

		// 每一次转动
		oneRoll () {
		  let index = this.index // 当前转动到哪个位置
		  const count = this.count // 总共有多少个位置
		  index += 1
		  if (index > count - 1) { index = 0 }
		  this.index = index
		},
	}	
	
})

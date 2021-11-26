function ObjList() {
	this.data = []
	this.recycle = function(obj) {
		//获取索引值findIndex
		var index = this.data.findIndex(function(item) {
			return item === obj
		})
		//根据索引值 删除 splice
		if (index !== -1) {
			this.data.splice(index, 1)
		}
	}
	this.clear = function() {
		this.data = []
	}
}

function getRandomInt(min, max) {
	return min + Math.ceil(Math.random() * (max - min ))
}
function getCenter(obj) {
	return {
		x: obj.x + obj.width / 2,
		y: obj.y + obj.height / 2
	}
}
function isUndefined(val) {
	return typeof val == 'undefined'
}
function isCollide(objA, objB) {
	//如果发现 只要x，y，width,height 中出现了undefined 我们就要主动的抛出一个异常，程序不再执行
	if (isUndefined(objA.x) || isUndefined(objA.y) || isUndefined(objA.width) || isUndefined(objA.height)) {
		//主动抛出错误
		//JSON.stringify 把对象中的内容 转换成字符串
		throw new Error('参数错误!' + '' + JSON.stringify(objA)) + '' + JSON.stringify(objB)
	}
	var centerA = getCenter(objA)
	var centerB = getCenter(objB)

	//2个矩形的几何中心点，在x，y轴上的距离，必须都小于两个矩形的宽/高之和的1/2，这种情况下 两个就发生了碰撞，函数输出ture
	return Math.abs(centerA.x - centerB.x) < (objA.width + objB.width) / 2 &&
		Math.abs(centerA.y - centerB.y) < (objA.height + objB.height) / 2
}
function isCollideOneAndGroup(obj, group) {
	/*	var result = underfinded
		
		group.forEach(function(item){
			if(isCollide(item,obj)){
				result = item
			}
		})
	return result */
	return group.find(function(item) {
		return isCollide(item, obj)
	})
}

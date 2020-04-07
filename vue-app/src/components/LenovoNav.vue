<template>
    <ul class="list">
		<li class="page">
			<router-link to="/home">
				<div class="shouye"></div>首页
			</router-link>
		</li>
		<li class="cation">
			<router-link to="/category">
				<div class="fenlei"></div>分类
			</router-link>
		</li>
		<li class="cart">
			<router-link to="/cart">
				<div class="shopp"></div>购物车
			</router-link>
		</li>
		<li class="personal">
			<router-link to="">
				<div class="geren"></div>我的
			</router-link>
		</li>
	</ul>
</template>

<script type="text/ecmascript-6">
    export default {
        
    }
</script>

<style lang="stylus" scoped>
    ul.list {
		height: 100%;
		display: flex;
		align-items: center;
	}
	ul.list>li {
		width: 25%;
		text-align: center;
		font-size: 12px;
	}
	ul.list>li>a{
		color: #333333;
	}
	ul.list>li>a>div{
		width: 22px;
		height: 22px;
		margin: 0 auto;
	}
	ul.list>li>a>.shouye {
		background: url(../assets/icon/shouye.png) no-repeat bottom;
		background-size: 22px;
	}
	ul.list>li>a>.fenlei {
		background: url(../assets/icon/fenlei.png) no-repeat;
		background-size: 22px;
	}
	ul.list>li>a>.shopp {
		background: url(../assets/icon/gouwuche.png) no-repeat;
		background-size: 22px;
	}
	ul.list>li>a>.geren {
		background: url(../assets/icon/geren.png) no-repeat;
		background-size: 22px;
	}
	ul.list>.page>a {
		color: #F4354e;
	}
</style>
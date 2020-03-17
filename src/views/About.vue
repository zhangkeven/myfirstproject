<template>
  <div class="about">
    <h1>{{name}}</h1>
  </div>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	import AxiosUtil from '@/util/axiosutil'
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...mapState({
				name:state=>state.main.name
			})
		},
		methods:{
			getData(){
				AxiosUtil.post({
				    url: 'querySaleRecordForReturn'
				  }).then(res => {
				   
				  }).catch(err => {
				    
				  })
			}
		},
		created() {
			this.getData()
		}
	}
</script>

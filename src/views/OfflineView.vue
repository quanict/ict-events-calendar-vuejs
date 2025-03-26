<template>
	<DavidUiLayout>
    </DavidUiLayout>
</template>


<script lang="ts">
import { ref, PropType, defineComponent, defineProps } from 'vue'
import DavidUiLayout from '@/layouts/DavidUiLayout.vue';

export default defineComponent({
	components: {
		DavidUiLayout,
	},

    updated(){
        console.log(`======= `, this.$props)
    }
})

</script>
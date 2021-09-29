<template>
  <div class="home">
    <app-title-page>
       LAST NEWS
    </app-title-page>
    <app-last-posts />

    <app-title-page>
       STATISTICS
    </app-title-page>
    <app-statistics />

    <app-title-page>
       POSTS DIAGRAMM
    </app-title-page>
    <app-posts-date-diagram />
  </div>
</template>

<script>
// <app-posts-date-diagram :postedBy="'612e3c52c46d5405b355464e'"/>
import AppTitlePage from '@/components/ui/AppTitlePage';
import AppLastPosts from './posts/AppLastPosts.vue';
import AppStatistics from '@/components/AppStatistics';
import AppPostsDateDiagram from '@/components/AppPostsDateDiagram';

export default {
  name: 'Home',
  components: {
    AppTitlePage,
    AppLastPosts,
    AppStatistics,
    AppPostsDateDiagram
  },
  data () {
    return {
      name: 'Home'
    };
  },
  computed: {
  },
  mounted () {
  }
};
</script>

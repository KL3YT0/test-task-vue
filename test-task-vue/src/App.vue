<template>
  <div class="app">
    <TheHeader />
    <main>
      <div class="container">
        <ParseForm @apply="createParseRequest" />

        <BaseButton
          @click="getParseDataByHashParsource"
          label="Обновить"
          :disabled="!hashParsource"
          class="refresh-btn"
        />

        <div class="card-lists">
          <div
            v-if="cards.kwork.length"
            :class="
              cards.freelance.length ? 'card-list_both' : 'card-list_single'
            "
          >
            <div class="caption">Kwork:</div>
            <card-list>
              <TheCard
                v-for="card in cards.kwork"
                @save="updateKworkCard"
                @remove="removeKworkCard"
                :key="card.id"
                :id="card.id"
                :title="card.title"
                :article="card.article"
              />
            </card-list>
          </div>

          <div
            v-if="cards.kwork.length && cards.freelance.length"
            class="vertical-line"
          />

          <div
            v-if="cards.freelance.length"
            :class="cards.kwork.length ? 'card-list_both' : 'card-list_single'"
          >
            <div class="caption">Freelance:</div>
            <card-list>
              <TheCard
                v-for="card in cards.freelance"
                @save="updateFreelanceCard"
                @remove="removeFreelanceCard"
                :key="card.id"
                :id="card.id"
                :title="card.title"
                :article="card.article"
              />
            </card-list>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import NProgress from 'nprogress';

import ParseService from '@/services/parse';
import KworkService from '@/services/kwork';
import FreelanceService from '@/services/freelance';

import { BaseButton } from '@/components/ui';
import { ParseForm, CardList, TheCard } from '@/components/widgets';
import TheHeader from '@/components/layouts/TheHeader.vue';

export default {
  name: 'HomeView',
  components: {
    TheHeader,
    ParseForm,
    CardList,
    TheCard,
    BaseButton,
  },
  mounted() {
    //
  },
  data() {
    return {
      cards: {
        kwork: [],
        freelance: [],
      },

      hashParsource: '',
    };
  },
  methods: {
    async createParseRequest(form) {
      const date = Date.now() % 2147483647;

      const body = {
        ...form,
        id_user: date,
        id_parsource: date,
        hash_parsource: date.toString(),
      };

      try {
        NProgress.start();

        const data = await ParseService.createRequest(body);

        this.cards.kwork = data.kwork_result;
        this.cards.freelance = data.freelancehabr_result;
        this.hashParsource = data.hash_parsource;
      } catch (err) {
        console.log(err);
      } finally {
        NProgress.done();
      }
    },

    async getParseDataByHashParsource() {
      try {
        if (!NProgress.isStarted()) {
          NProgress.start();
        }

        const data = await ParseService.getDataByHashParsource(
          this.hashParsource
        );

        this.cards.kwork = data[0].kwork_result;
        this.cards.freelance = data[0].freelancehabr_result;
      } catch (err) {
        console.log(err);
      } finally {
        NProgress.done();
      }
    },

    async updateFreelanceCard(card) {
      const { article, id, title, keyword, url } = card;

      try {
        NProgress.start();
        const updated = await FreelanceService.update(
          { article, title, keyword, url },
          id
        );

        const cardIndex = this.cards.freelance.findIndex(
          (card) => card.id === id
        );
        this.cards.freelance[cardIndex] = updated;
      } catch (err) {
        console.log(err);
      } finally {
        NProgress.done();
      }
    },

    async removeFreelanceCard(id) {
      try {
        NProgress.start();
        await FreelanceService.removeById(id);
        this.getParseDataByHashParsource();
      } catch (err) {
        console.log(err);
      }
    },

    async updateKworkCard(card) {
      const { article, id, title, keyword, url } = card;

      try {
        NProgress.start();
        const updated = await KworkService.update(
          { article, title, keyword, url },
          id
        );

        const cardIndex = this.cards.kwork.findIndex((card) => card.id === id);
        this.cards.kwork[cardIndex] = updated;
      } catch (err) {
        console.log(err);
      } finally {
        NProgress.done();
      }
    },

    async removeKworkCard(id) {
      try {
        NProgress.start();
        await KworkService.removeById(id);
        this.getParseDataByHashParsource();
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="scss">
.app {
  display: flex;
  flex-direction: column;
  gap: 30px 0px;
}

main {
  margin-top: 40px;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.user-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px 0;

  &__item {
    background: gray;
    padding: 5px;
    border-radius: 20px;
    color: white;
    font-weight: bold;
  }
}

.user-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px 0;
}

.refresh-btn {
  margin: 10px auto;
}

.card-list_single {
  width: 100%;
}

.card-lists {
  display: flex;
}

.card-list_both {
  width: 50%;
}

.caption {
  color: $primaryTrans;
  font-weight: bold;
  margin: 25px 0px 5px;
}

.loader {
  color: $primaryTrans;
  font-weight: bold;
  margin: auto;
  font-size: 30px;
  text-align: center;
}

.vertical-line {
  width: 2px;
  height: 100%;
  background-color: $primaryTrans;
}
</style>
